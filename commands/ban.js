const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);
const errors = file([cwd, "utils", "errors.json"]);

module.exports = {
    permission: permissions.moderator,
    code: async (msg, argstring, config) => {
        let args = argstring.split(" ");
        if (!args[0]) return msg.channel.send("Please mention the lucky one.");
        const user = msg.mentions.users.first();
        if (user) {
            const member = msg.guild.member(user);
            if (member) {
                member.ban(msg.author.tag).catch((e) => {
                    throw errors.botperms;
                });
            }
        }
    },
    help: `
    Usage: \`ban [mention of user to ban]\`.
    
    Requires banning privilege for both the bot and whoever issues the command.
    `
}
