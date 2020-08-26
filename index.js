// load libs
const fs = require("fs");
const path = require("path");

const Discord = require("discord.js");
const { time } = require("console");

const cwd = process.cwd();

const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const humandate = require(path.join(cwd, "utils", "humandate.js"));

const permissions = file([cwd, "utils", "permissions.json"]);

const maxlength = 2000;

let globalconfig, servers, commandcache;
let online = false;

function reload (clearcache = true) {
    globalconfig = load("config");
    servers = load("servers");
    if (clearcache) commandcache = {};  // also clear the command cache to make sure the commands also use new config.
    if (online) client.user.setActivity(globalconfig.gamestatus); // set game status in case it changed in config. only when online to prevent error.
}

reload(); // load the configs for first time

async function runcommand (command, msg, argstring, config, permission_level) {
    if (permission_level < commandcache[command].permission) {
        msg.channel.send("You aren't allowed to use this command!");
    } else {    
        const result = await commandcache[command]
            .code(msg, argstring, config)
            .catch(console.log);
            
        if (result == undefined); else if (typeof(result) == "object") {
            servers = result;
        } else {
            if (result.length < maxlength) msg.channel.send(result);
            else {
                let last = 0;
                for (let i = maxlength; i < result.length; i += maxlength) {
                    msg.channel.send(result.substr(last, i));
                    last = i;
                }
            }
        }
    }
}

const client = new Discord.Client();

// runs at successful login to discord
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
    online = true;
    // set game status
    client.user.setActivity(globalconfig.gamestatus);

    //  In case bot is added to a new guild while it was offline
    client.guilds.cache.forEach(async guild => {
        if (!servers[guild.id]) servers[guild.id] = {
            ...file(["database", "default_config.json"], true),
            ...load("config").default_config
        };

        servers[guild.id].name = guild.name;
/*
        // load timers
        const current = Date.now();
        for (timestamp in servers[guild.id].reminders) {
            const timer = servers[guild.id].reminders[timestamp];
            const channel = await client.channels.fetch(timer.channel);
            console.log(channel);
            if (timestamp > current) {
                setTimeout(() => {
                    channel.send(`<@${timer.user}>, ${timer.message}`);
                    delete servers[msg.guild.id].reminders[timestamp];
                    save("servers", servers);
                }, timestamp - current);
            } else if (current - timestamp < 60000) { // 1 minute
                channel.send(`<@${timer.user}>, ${timer.message}`);
            } else {
                channel.send(`<@${timer.user}>, here is a reminder for ${timer.message} you set for ${humandate(current - timestamp)} ago :)`);
            }
        }*/
    });

    save("servers", servers);
});

client.on("guildCreate", guild => {
    servers[guild.id] = {
        ...file(["database", "default_config.json"], true),
        ...load("config").default_config
    }
    servers[guild.id].name = guild.name;
    save("servers", servers);
});

client.on("message", async (msg) => {
    if (msg.author.bot || msg.channel.type == "dm") return;

    const config = servers[msg.guild.id.toString()];   // Load the config for the guild this message is from

    let permission_level = permissions.member;
    if (msg.member.roles.cache.find(r => r.name == config.trialmodrole)) permission_level = permissions.trialmod;
    if (msg.member.permissions.has("KICK_MEMBERS")) permission_level = permissions.moderator;
    if (globalconfig.sysadmins.includes(msg.author.id)) permission_level = permissions.sysadmin;

    config.errands.enabled.forEach((name) => {
        const utilpath = path.join(cwd, "utils", name + ".js")
        require(utilpath)(msg, config);
        delete require.cache[require.resolve(utilpath)]; // no caching to allow live patching and they are rarely used anyway.
    });

    if (
        msg.content.slice(0, config.prefix.length).toLowerCase() != config.prefix.toLowerCase() || // Does it start with prefix? Prefix can be capitalized for mobile users with auto capitalisation.
        (permission_level < permissions.trialmod && config.blocked_channels.includes(msg.channel.id))  // If bot isn't allowed in channel. Moderators/sysadmins can use bot anywhere.
    ) return;   // Then stop

    const message = msg.content.substr(config.prefix.length);   // Only get the part after the prefix
    let firstspace = message.indexOf(" ");    // Get the index of the first space in the message (= where the arguments begin)
    firstspace = firstspace < 0 ? message.length : firstspace;  // Set it to end of message if there aren't any arguments
    const command = message.substr(0, firstspace);  // Get the command name, eg. the part between prefix and first space
    if (config.blocklist.includes(command)) return; // Stop execution if the command is blocked on this server
    const argstring = message.substr(firstspace + 1);   // Get the string of arguments
    console.log(msg.author.tag, "   ", message);    // Log who runs what command
    if (command in commandcache && globalconfig.caching) {  // If the command is in cache and the caching functionality is enabled
        runcommand (command, msg, argstring, config, permission_level);
    } else {    // Otherwise get the command from disk
        let commandfilepath = path.join(cwd, "commands", command + ".js");  // Compose the path to where the command should be
        if (fs.existsSync(commandfilepath)) {   // Check if command exists
            commandcache[command] = require(commandfilepath); // Get the code from disk
            delete require.cache[require.resolve(commandfilepath)]; // Delete nodejs buitin cache, because it's already cached and to enable live bot updates.
            runcommand (command, msg, argstring, config, permission_level);
        } else {
            if (globalconfig.sysadmins.includes(msg.author.id) && command == "reload") {
                reload(true);
                msg.react("👍");
            } else {
                msg.channel.send(config.storage[command] || "What do you mean 🙈");
            }
        }
    }
});

console.log("logging in");
client.login(globalconfig.token);   // Login to discord
