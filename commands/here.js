const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);

const globalconfig = load("config");
const servers = load("servers");

module.exports = {
    help: ``,
    permission: permissions.moderator,
    code: async (msg, argstring, config) => {        
        if (!servers[msg.guild.id].allowed_channels.includes(msg.channel.id)) {
            servers[msg.guild.id].allowed_channels.push(msg.channel.id);
            save("servers", servers);
            msg.react("👍");
        } else {
            msg.channel.send("Already allowed here.");
        }

        return servers;
    }
}