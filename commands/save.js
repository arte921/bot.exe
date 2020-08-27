const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));


module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        let firstspace = argstring.indexOf(" ");
        const key = argstring.substr(0, firstspace);
        const value = argstring.substr(firstspace + 1);
        
        const servers = await load("servers");
        const storage = servers[msg.guild.id].storage;

        console.log(key, value);
        if (!(key && value)) return errors.syntax;
        storage[key] = value;
        await save("servers", servers);
        msg.react("👍");

        return servers;
    },
    help: `
    Usage: save [key] [value]
    
    Saves the value (any string of text) at the given key (a single word)`
}


