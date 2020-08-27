const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const humandate = require(path.join(cwd, "utils", "humandate.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));


module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => humandate(process.uptime() * 1000),
    help: `Returns the uptime of the bot.`
}
