const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);

const globalconfig = load("config");
const servers = load("servers");


module.exports = {
    help: ``,
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        if (!msg.member.permissions.has("KICK_MEMBERS") && !globalconfig.sysadmins.includes(msg.author.id)) {
            msg.channel.send("This command requires administrator privileges.");
            return;
        }
        
        if (servers[msg.guild.id].allowed_channels.includes(msg.channel.id)) {
            const index = servers[msg.guild.id].allowed_channels.indexOf(msg.channel.id);
            servers[msg.guild.id].allowed_channels.splice(index, 1);
            save("servers", servers);
            msg.react("👍");
            return servers;
        } else {
            msg.channel.send("Was not allowed here already!");
        }
    }
}