const path = require("path");

const cwd = process.cwd();

const { save, load } = require(path.join(cwd, "database", "index.js"));

module.exports = {
    help: ``,
    permission: 0,
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