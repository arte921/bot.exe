const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));


module.exports = {
    permission: permissions.moderator,
    code: async (msg, argstring, config) => {
        const servers = await load("servers");
        if (!config.selfroles.includes(argstring)) return "Not a selfrole!";
        servers[msg.guild.id].selfroles = servers[msg.guild.id].selfroles.filter(command => command != argstring);
        await save("servers", servers);
        msg.react("👍");

        return servers;
    },
    help: `
    Usage: \`delrole [role name]\`

    Makes a role not self assignable
    `
}