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
        if (!config.selfroles.includes(argstring)) return "Not a selfrole!";
        servers[msg.guild.id].selfroles = servers[msg.guild.id].selfroles.filter(command => command != argstring);
        save("servers", servers);
        msg.react("👍");

        return servers;
    },
    help: `
    Usage: \`delrole [role name]\`

    Makes a role not self assignable
    `
}