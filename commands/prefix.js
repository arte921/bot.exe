const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);
const errors = file([cwd, "utils", "errors.json"]);

module.exports = {
    permission: permissions.moderator,
    code: async (msg, argstring, config) => {
        const servers = load("servers");
        servers[msg.guild.id].prefix = argstring;
        save("servers", servers);
        msg.react("👍");
        return servers;
    },
    help: `
    Usage: \`prefix [prefix]\`
    
    Sets the prefix for this server`
}