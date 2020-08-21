const path = require("path");

const cwd = process.cwd();

const { save, load } = require(path.join(cwd, "database", "index.js"));

const globalconfig = load("config");
const servers = load("servers");

module.exports = {
    help: ``,
    permission: 0,
    code: async (msg, argstring, config) => {
        if (!(msg.member.permissions.has("KICK_MEMBERS") || globalconfig.sysadmins.includes(msg.author.id)) || argstring == "") {
            msg.channel.send("This command requires administrator privileges and a prefix to set.");
            return;
        }
        
        servers[msg.guild.id].prefix = argstring;
        save("servers", servers);
        msg.react("👍");
        return servers;
    }
}