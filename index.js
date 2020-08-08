"use strict";

const Discord = require("discord.js");
const fs = require("fs");

const { mock } = require("./util.js");

let globalconfig;

function reloadconfig() {
    globalconfig = JSON.parse(fs.readFileSync("./config.json").toString());
}

function savedatabase() {
    fs.writeFileSync("./backup.json", fs.readFileSync("./database.json"));  // backup db, in case of corruption
    fs.writeFileSync("./database.json", JSON.stringify(database, null, 4));  // write the actual database
}

let database = JSON.parse(fs.readFileSync("./database.json").toString());

reloadconfig();

const client = new Discord.Client();

let commandcache = {};

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);

    client.user.setActivity(globalconfig.gamestatus);

    client.guilds.cache.forEach((guild) => {
        if (!database[guild.id]) {
            database[guild.id] = globalconfig.default_config;

            database[guild.id].allowed_channels = guild.channels.cache
                .filter((channel) => channel.type == "text")
                .map((channel) => channel.id);

            database[guild.id] = JSON.parse(JSON.stringify(database[guild.id])); // to prevent js doing copy by refence and having same entry for every server
        }
    });

    savedatabase();
});

client.on("message", async (msg) => {
    const config = database[msg.guild.id.toString()].catch(() => {});   // to prevent errors on dm

    if (
        !new RegExp(`^${config.prefix}[a-z]+`).test(msg.content) || // starts with prefix
        (msg.author.bot && !config.allowspam) ||    // is not a bot if it's not allowed to respond to bots
        !(config.allowed_channels.includes(msg.channel.id)) ||  // if bot is allowed in channel
        message.channel.type == "dm"    // if getting dm'd, to prevent errors
    ) return;

    const message = msg.content.substr(config.prefix.length);
    let firstspace = message.indexOf(" ");
    firstspace = firstspace < 0 ? message.length : firstspace;
    const command = message.substr(0, firstspace);
    const argstring = message.substr(firstspace + 1);

    console.log(msg.author.tag, "   ", message);

    if (command in commandcache && globalconfig.caching) {
        commandcache[command](msg, argstring, config);
    } else {
        let commandfilepath = "./commands/" + command + ".js";
        if (
            !config.blocklist.includes(command) &&
            fs.existsSync(commandfilepath)
        ) {
            // only if command is not blocked and installed
            commandcache[command] = require(commandfilepath); // get the code
            commandcache[command](msg, argstring, config); // run the code
            delete require.cache[require.resolve(commandfilepath)]; // enable live bot updates
        } else if (globalconfig.sysadmins.includes(msg.author.id)) {
            switch (command) {
                case "reloadconfig":
                    reloadconfig();
                    client.user.setActivity(globalconfig.gamestatus);
                    break;
                case "clearcache":
                    commandcache = {};
                    break;
                case "reloaddatabase":
                    database = JSON.parse(fs.readFileSync("./database.json").toString());
                    break;
                default:
                    msg.channel.send("TYPO! :D");
                    break;
            }
        } else {
            msg.channel.send("wdym " + mock(message));
        }
    }
});

console.log("logging in");
client.login(globalconfig.token);
