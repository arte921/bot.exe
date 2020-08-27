const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));


module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        if (!argstring || argstring == "") return errors.syntax;
        const servers = load("servers");
        if (!servers[argstring]) return "This bot doesn't seem to be in the given server!"
        const current = servers[msg.guild.id].storage;
        const other = servers[argstring].storage;

        servers[msg.guild.id].storage = {
            ...other,
            ...current
        };

        save("servers", servers);
        msg.react("👍");

        return servers;
    },
    help: `
    Usage: pull [server id]
    
    Pulls all custom commands from the discord server with given id. Keeps current entries.`
}


