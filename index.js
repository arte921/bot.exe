// load libs
const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

const cwd = process.cwd();

const { save, load } = require(path.join(cwd, "database", "index.js"));

const newserver = require(path.join(cwd, "errands", "newserver.js"));
const bold = require(path.join(cwd, "errands", "bold.js"));

let globalconfig, servers, commandcache;
let online = false;

function reload(clearcache = true) {
    globalconfig = load("config");
    servers = load("servers");
    if (clearcache) commandcache = {};  // also clear the command cache to make sure the commands also use new config.
    if (online) client.user.setActivity(globalconfig.gamestatus); // set game status in case it changed in config. only when online to prevent error.
}

reload(); // load the configs for first time

const client = new Discord.Client();

// runs at successful login to discord
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
    online = true;
    // set game status
    client.user.setActivity(globalconfig.gamestatus);

    //  In case bot is added to a new guild while it was offline
    client.guilds.cache.forEach((guild) => {
        if (!servers[guild.id]) servers = newserver(guild);
    });
});

client.on("guildCreate", guild => servers = newserver(guild));    // If bot is added to guild at runtime

client.on("message", async (msg) => {
    if (msg.author.bot || msg.channel.type == "dm") return;

    const config = servers[msg.guild.id.toString()];   // Load the config for the guild this message is from

    require(path.join(cwd, "errands", "bold.js"))(msg, config); // nodejs will cache it

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
    if (config.blocklist.commands.includes(command)) return; // Stop execution if the command is blocked on this server
    const argstring = message.substr(firstspace + 1);   // Get the string of arguments
    console.log(msg.author.tag, "   ", message);    // Log who runs what command
    if (command in commandcache && globalconfig.caching) {  // If the command is in cache and the caching functionality is enabled
        commandcache[command](msg, argstring, config);  // Run the command code from the cache
    } else {    // Otherwise get the command from disk
        let commandfilepath = path.join(cwd, "commands", command + ".js");  // Compose the path to where the command should be
        if (fs.existsSync(commandfilepath)) {   // Check if command exists
            commandcache[command] = require(commandfilepath); // Get the code from disk
            commandcache[command](msg, argstring, config); // Run the code
            reload(false);
            delete require.cache[require.resolve(commandfilepath)]; // Delete nodejs buitin cache, because it's already cached and to enable live bot updates
        } else {
            let done = false;
            if (globalconfig.sysadmins.includes(msg.author.id) && command == "reload") {
                reload();
                done = true;
            }
            
            if (!done) msg.channel.send("What do you mean 🙈");
        }
    }
});

console.log("logging in");
client.login(globalconfig.token);   // Login to discord
