const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);

module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        let seconds = Math.floor(process.uptime());
        let mins = Math.floor(seconds / 60);
        let hours = Math.floor(mins / 60);
        let days = Math.floor(hours / 24);
        msg.channel.send(
            `${days} days, ${hours % 24} hours, ${mins % 60} minutes, ${seconds % 60} seconds`
        );
    },
    help: `
    Returns the uptime of the bot.
    `
}
