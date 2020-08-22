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
        if (storage[argstring]) {
            msg.channel.send(storage[argstring]);
        } else {
            msg.channel.send(`No entry for "${argstring}"`);
        }
    },
    help: `
    Usage: \`load [key]\`
    
    Returns the value saved at the requested key`
}