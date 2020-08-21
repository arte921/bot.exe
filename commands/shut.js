const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);

module.exports = {
    help: ``,
    permission: permissions.moderator,
    code: async (msg, argstring, config) => {  
        const servers = load("servers");      
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