const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));


module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {        
        const servers = await load("servers");
        const storage = servers[msg.guild.id].storage;
        
        if (!argstring || argstring == "") return errors.syntax;
        if (!storage[argstring]) return "That entry doesn't exist already";
        delete storage[argstring];
        save("servers", servers);
        msg.react("👍");

        return servers;
    },
    help: `
    Usage: delete [key]
    
    Deletes the saved value at the given key (a single word)`
}