const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);

module.exports = {
    help: ``,
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        const user = msg.mentions.users.first() || msg.author;
        const url = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=4096`;
        msg.channel.send(url);
    }
}