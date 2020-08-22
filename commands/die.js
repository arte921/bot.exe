const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);
const errors = file([cwd, "utils", "errors.json"]);
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