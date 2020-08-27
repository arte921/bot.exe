const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));


module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        msg.channel.send("Hello " + msg.author.username);   // no return, for reliability
    },
    help: `
    Returns a text plus the name of who sent the text.
    `
}
