const path = require("path");

const cwd = process.cwd();

const { save, load } = require(path.join(cwd, "database", "index.js"));

const globalconfig = load("config");
const servers = load("servers");

module.exports = async (msg, argstring, config) => {
    if (!msg.member.permissions.has("KICK_MEMBERS") && !globalconfig.sysadmins.includes(msg.author.id)) {
        msg.channel.send("This command requires administrator privileges.");
        return;
    }
    
    servers[msg.guild.id].allowed_channels = [];
    save("servers", servers);
    msg.react("👍");
    return servers;
};