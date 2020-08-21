const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);

module.exports = {
    help: ``,
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        const servers = load("servers");
        const storage = servers[msg.guild.id].storage;
        if (storage[argstring]) {
            msg.channel.send(storage[argstring]);
        } else {
            msg.channel.send(`No entry for "${argstring}"`);
        }
    }
}