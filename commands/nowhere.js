const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);

module.exports = {
    help: ``,
    permission: permissions.moderator,
    code: async (msg, argstring, config) => {     
        const servers = load("servers");   
        servers[msg.guild.id].allowed_channels = [];
        save("servers", servers);
        msg.react("👍");
        return servers;
    }
}