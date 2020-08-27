const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));

const globalconfig = load("config");

module.exports = {
    permission: permissions.sysadmin,
    code: async (msg, argstring, config) => {
        await msg.react("👋");
        process.exit();
    },
    help: `
    Turns off the bot, which will then automatically restart.`
}
