const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);
const errors = file([cwd, "utils", "errors.json"]);

module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        if (!argstring || argstring == "") return errors.syntax;
        const servers = load("servers");
        const current = servers[msg.guild.id].storage;
        const other = servers[argstring].storage;

        servers[msg.guild.id].storage = {
            ...other,
            ...current
        }        

        save("servers", servers);
        msg.react("👍");

        return servers;
    },
    help: `
    Usage: save [key] [value]
    
    Saves the value (any string of text) at the given key (a single word)`
}


