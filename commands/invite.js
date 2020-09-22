const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));


module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => "You can invite me to your server using this link: https://discord.com/api/oauth2/authorize?client_id=576435404107022347&permissions=3206214&scope=bot",
    help: `
    Returns the bot's invite link.
    `
}
