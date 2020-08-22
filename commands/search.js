const start = "http://letmegooglethat.com/?q=";

const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);
const errors = file([cwd, "utils", "errors.json"]);

module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        msg.channel.send(
            start +
            argstring.replace(/ /g, "+")
        );
    },
    help: `
    Usage: \`search [search query]\`.
    
    Sends a semi-sarcastic reminder to do research yourself before asking for help.
    `
}