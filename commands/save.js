const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);
const errors = file([cwd, "utils", "errors.json"]);

module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        let firstspace = argstring.indexOf(" ");
        const key = argstring.substr(0, firstspace);
        const value = argstring.substr(firstspace + 1);
        
        const servers = load("servers");
        const storage = servers[msg.guild.id].storage;

        console.log(key, value);
        if (!(key && value)) throw errors.syntax;
        storage[key] = value;
        save("servers", servers);
        msg.react("👍");

        return servers;
    },
    help: ``
}


