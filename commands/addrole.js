const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);
const errors = file([cwd, "utils", "errors.json"]);

module.exports = {
    permission: permissions.moderator,
    code: async (msg, argstring, config) => {
        const servers = load("servers");
        if (!msg.guild.roles.cache.find(role => role.name == argstring)) return "Not a role!";
        if (config.selfroles.includes(argstring)) return "Already a selfrole!";
        servers[msg.guild.id].selfroles.push(argstring);
        save("servers", servers);
        msg.react("👍");

        return servers;
    },
    help: `
    Usage: \`addrole [role name]\`

    Makes a role self assignable
    `
}