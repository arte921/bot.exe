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

// runs at successful login to discord
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);

    // set game status
    client.user.setActivity(globalconfig.gamestatus);

    let changed = false;    // Only write when db changes
    // loops trough guilds, adds default config for new guilds
    client.guilds.cache.forEach((guild) => {
        if (!database[guild.id]) {  // only add new entry if didn't exist before
            changed = true; // So it get actually saved to disk
            database[guild.id] = globalconfig.default_config;   // add in default config

            database[guild.id].allowed_channels = guild.channels.cache  // loop trough channels, add all channels to approved channels
                .filter((channel) => channel.type == "text")    // Only include text channels
                .map((channel) => channel.id);  // Only save channel id's 

            database[guild.id] = JSON.parse(JSON.stringify(database[guild.id])); // Prevent js doing copy by refence and having same entry for every server
        }
    });

    if (changed) savedatabase(); // Write the database to disk if it changed.
});

client.on("message", async (msg) => {
    if (msg.channel.type == "dm") return; // Stop if getting dm'd, to prevent errors
    
    const config = database[msg.guild.id.toString()];   // Load the config for the guild this message is from

    if (
        !new RegExp(`^${config.prefix}[a-z]+`).test(msg.content) || // Does it start with prefix?
        (msg.author.bot && !config.allowspam) ||    // Is not a bot if it's not allowed to respond to bots
        !(config.allowed_channels.includes(msg.channel.id)) // If bot isn't allowed in channel
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
        } else if (globalconfig.sysadmins.includes(msg.author.id)) {    // Commands are only accessible by bot admins
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
                    msg.channel.send("I didn't quite catch that");   // Slightly different text for debugging purposes
                    break;
            }
        } else {
            msg.channel.send("What do you mean 🙈");
        }
    }
});

console.log("logging in");
client.login(globalconfig.token);   // Login to discord
