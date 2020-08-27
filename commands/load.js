const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));


module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        const servers = await load("servers");
        const storage = servers[msg.guild.id].storage;
        if (storage[argstring]) {
            return storage[argstring];
        } else {
            return `No entry for "${argstring}"`;
        }
    },
    help: `
    Usage: \`load [key]\`
    
    Returns the value saved at the requested key`
}