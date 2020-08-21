const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);

const alloweverywhere = require(path.join(cwd, "utils", "alloweverywhere.js"));

const globalconfig = load("config");

module.exports = {
    permission: permissions.moderator,
    code: async (msg, argstring, config) => {        
        msg.react("👍");
        return alloweverywhere(msg.guild);
    },
    help: ``
}