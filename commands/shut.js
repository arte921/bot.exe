const path = require("path");

const cwd = process.cwd();

const { save, load } = require(path.join(cwd, "database", "index.js"));

const globalconfig = load("config");
const servers = load("servers");

module.exports = async (msg, argstring, config) => {
    if (!msg.member.permissions.has("KICK_MEMBERS") || !globalconfig.sysadmins.includes(msg.author.id)) {
        msg.channel.send("This command requires administrator privileges.");
        return;
    }
    
    if (config.allowed_channels.includes(msg.channel.id)) {
        const index = config.allowed_channels.indexOf(msg.channel.id);
        globalconfig[msg.guild.id].allowed_channels.splice(index, 1);
        save("servers", servers);
    } else {
        msg.channel.send("Was not allowed here already!");
    }
};