"use strict";

// load libs
const Discord = require("discord.js");
const fs = require("fs");

let globalconfig;

function reloadconfig() {   // In a function to enable live reloading
    globalconfig = JSON.parse(fs.readFileSync("./config.json").toString());
}

function savedatabase() {   // stores the database variable and creates a backup of the old copy
    fs.writeFileSync("./backup.json", fs.readFileSync("./database.json"));  // backup db, in case of corruption
    fs.writeFileSync("./database.json", JSON.stringify(database, null, 4)); // write the actual database
}

let database = JSON.parse(fs.readFileSync("./database.json").toString());   // initialize database from disk

reloadconfig(); // load the config for first time

const client = new Discord.Client();

let commandcache = {};  // declare emtpy cache to prevent null errors
let lastid;

function newServer(guild) {
    database[guild.id] = globalconfig.default_config;   // add in default config
    database[guild.id].name = guild.name;
    allowEverywhere(guild);

    database[guild.id] = JSON.parse(JSON.stringify(database[guild.id])); // Prevent js doing copy by refence and having same entry for every server. Might not be needed anymore. TODO
    savedatabase();
}

function allowEverywhere(guild) {
    database[guild.id].allowed_channels = guild.channels.cache  // loop trough channels, add all channels to approved channels
        .filter((channel) => channel.type == "text")    // Only include text channels
        .map((channel) => channel.id);  // Only save channel id's
    savedatabase();
}

// runs at successful login to discord
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);

    // set game status
    client.user.setActivity(globalconfig.gamestatus);

    //  In case bot is added to a new guild while it was offline
    client.guilds.cache.forEach((guild) => {
        if (!database[guild.id]) newServer(guild);
    });
});

client.on("guildCreate", guild => newServer(guild));    // If bot is added to guild at runtime

client.on("message", async (msg) => {
    if (msg.author.bot || msg.channel.type == "dm") return;

    const config = database[msg.guild.id.toString()];   // Load the config for the guild this message is from

    if (config.boldchannels.includes(msg.channel.id)) {
        if (lastid != msg.author.id) {  // it's possible for an user to change their name/pfp after sending one message, then sending another, but that's unlikely and doesnt cause harm.
            lastid = msg.author.id;
            const pfp = `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png`;
            client.user.setAvatar(pfp).catch((e) => {});
            msg.guild.members.cache.get(client.user.id).setNickname(msg.author.username);
        }
        msg.delete().catch((e) => {});
        msg.channel.send("**" + msg.content + "**");
    }



    if (
        !new RegExp(`^${config.prefix}[a-z]+`).test(msg.content) || // Does it start with prefix?
        !(
            config.allowed_channels.includes(msg.channel.id) ||
            msg.member.permissions.has("KICK_MEMBERS") ||
            globalconfig.sysadmins.includes(msg.author.id)
        )  // If bot isn't allowed in channel. Admins can use bot anywhere.
    ) return;   // Then stop

    const message = msg.content.substr(config.prefix.length);   // Only get the part after the prefix
    let firstspace = message.indexOf(" ");    // Get the index of the first space in the message (= where the arguments begin)
    firstspace = firstspace < 0 ? message.length : firstspace;  // Set it to end of message if there aren't any arguments
    const command = message.substr(0, firstspace);  // Get the command name, eg. the part between prefix and first space
    if (config.blocklist.includes(command)) return; // Stop execution if the command is blocked on this server
    const argstring = message.substr(firstspace + 1);   // Get the string of arguments
    console.log(msg.author.tag, "   ", message);    // Log who runs what command

    if (command in commandcache && globalconfig.caching) {  // If the command is in cache and the caching functionality is enabled
        commandcache[command](msg, argstring, config);  // Run the command code from the cache
    } else {    // Otherwise get the command from disk
        let commandfilepath = "./commands/" + command + ".js";  // Compose the path to where the command should be
        if (fs.existsSync(commandfilepath)) {   // Check if command exists
            commandcache[command] = require(commandfilepath); // Get the code from disk
            commandcache[command](msg, argstring, config); // Run the code
            delete require.cache[require.resolve(commandfilepath)]; // Delete nodejs buitin cache, because it's already cached and to enable live bot updates
        } else {
            let done = true;
            if (globalconfig.sysadmins.includes(msg.author.id)) {    // Commands are only accessible by bot admins
                switch (command) {  // These commands need to be run from this file
                    case "reloadconfig":    // Allow for live globalconfig reloading
                        reloadconfig();     // Set the globalconfig var
                        client.user.setActivity(globalconfig.gamestatus);   // Set the game status, which might have been changed in the config
                        break;
                    case "clearcache":  // Clear the command cache
                        commandcache = {};  // Set it to empty object to prevent null errors
                        break;  
                    case "reloaddatabase":  // Allow on the fly reloading of the database (which can be manually edited)
                        database = JSON.parse(fs.readFileSync("./database.json").toString());
                        break;
                    default:
                        done = false;
                        break;
                }
            }

            if (!done && (msg.member.permissions.has("KICK_MEMBERS") || globalconfig.sysadmins.includes(msg.author.id))) {
                done = true;
                switch (command) {
                    case "here":
                        if (!config.allowed_channels.includes(msg.channel.id)) {
                            config.allowed_channels.push(msg.channel.id);
                        } else {
                            msg.channel.send("Already allowed here.");
                        }                        
                        savedatabase();
                        break;
                    case "shut":
                        if (config.allowed_channels.includes(msg.channel.id)) {
                            const index = config.allowed_channels.indexOf(msg.channel.id);
                            config.allowed_channels.splice(index, 1);
                            savedatabase();
                        } else {
                            msg.channel.send("Was not allowed here already!");
                        }
                        break;
                    case "anywhere":
                        allowEverywhere(msg.guild);
                        break;
                    case "nowhere":
                        config.allowed_channels = [];
                        savedatabase();
                        break;
                    default:
                        done = false;
                        break;
                }
            }
            
            if (!done) msg.channel.send("What do you mean 🙈");
        }
    }
});

console.log("logging in");
client.login(globalconfig.token);   // Login to discord
