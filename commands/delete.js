const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);
const errors = file([cwd, "utils", "errors.json"]);

module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {        
        const servers = load("servers");
        const storage = servers[msg.guild.id].storage;
        
        if (!argstring || argstring == "") throw errors.syntax;
        if (!storage[argstring]) throw "That entry doesn't exist already";
        delete storage[argstring];
        save("servers", servers);
        msg.react("👍");

        return servers;
    },
    help: `
    Usage: delete [key]
    
    Deletes the saved value at the given key (a single word)`
}