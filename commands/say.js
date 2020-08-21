const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);

module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        msg.channel.send(argstring);
    },
    help: `
    Usage: \`say [text]\`.
    
    Simply repeats you by sending the given text.
    `
}
