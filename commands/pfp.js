const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);
const errors = file([cwd, "utils", "errors.json"]);

module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        const user = msg.mentions.users.first() || msg.author;
        return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=4096`;
    },
    help: `
    Usage: \`pfp (mention)\`
    
    Returns a full res version of the mentioned user's profile picture, or the message author if none is given.
    `
}