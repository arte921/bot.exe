// load libs
const fs = require("fs");
const path = require("path");

const Discord = require("discord.js");

const cwd = process.cwd();

const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));

let globalconfig, servers, commandcache;
let online = false;

async function reload (clearcache = true) {
    globalconfig = await load("config");
    servers = await load("servers");
    if (clearcache) commandcache = {};  // also clear the command cache to make sure the commands also use new config.
    if (online) client.user.setActivity(globalconfig.gamestatus); // set game status in case it changed in config. only when online to prevent error.

    const commands = await fs.promises.readdir(path.join(cwd, "commands"));
    commands.forEach(command => {
        commandcache[command.replace(".js", "")] = require(path.join(cwd, "commands", command));
    });
}

async function runcommand (command, msg, argstring, config, permission_level) {

}

const client = new Discord.Client();

// Runs at successful login to discord.
client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}`);
    online = true;
    // set game status
    client.user.setActivity(globalconfig.gamestatus);

    //  In case bot is added to a new guild while it was offline
    client.guilds.cache.forEach(async guild => {
        if (!servers[guild.id]) servers[guild.id] = {
            ...await file(["database", "default_config.json"], true),
            ...(await load("config")).default_config
        };

        servers[guild.id].name = guild.name;
    });

    await save("servers", servers);
});

// Runs on new message.
client.on("message", async msg => {
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
    const argstring = message.substr(firstspace + 1);   // Get the string of arguments
    console.log(msg.author.tag, "   ", message);    // Log who runs what command
    
    if (!commandcache[command]) return msg.channel.send(config.storage[command] || "That's not a command!");
    if (config.blocklist.includes(command)) return msg.channel.send("That command is blocked on this server!");
    if (permission_level < commandcache[command].permission) return msg.channel.send("You aren't allowed to use this command!");
          
    const result = await commandcache[command]
        .code(msg, argstring, config)
        .catch(console.log);
        
    if (result == undefined); else if (typeof(result) == "object") servers = result
    else if (typeof(result) == "string" && result.length > 0) msg.channel.send(msg.channel.send(result));

});

// Runs when added to new server.
client.on("guildCreate", async guild => {
    const cfg = await load("config");
    servers[guild.id] = {
        ...await file(["database", "default_config.json"], true),
        ...cfg.default_config
    }
    servers[guild.id].name = guild.name;
    await await save("servers", servers);
});

 // load the configs for first time
reload().then(() => {
    console.log("logging in");
    client.login(globalconfig.token);   // Login to discord
}); 