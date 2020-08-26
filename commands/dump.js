const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);
const errors = file([cwd, "utils", "errors.json"]);

module.exports = {
    permission: permissions.sysadmin,
    code: async (msg, argstring, config) => {
        console.log(await msg.channel.fetchMessages());
    },
    help: ``
}