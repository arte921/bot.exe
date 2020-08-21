const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);

module.exports = {
    help: ``,
    permission: permissions.moderator,
    code: async (msg, argstring, config) => {
        if (!msg.member.permissions.has("BAN_MEMBERS")) return;

        let args = argstring.split(" ");
        if (!args[0]) return msg.channel.send("Please mention the lucky one.");
        const user = msg.mentions.users.first();
        if (user) {
            const member = msg.guild.member(user);
            if (member) {
                member.ban(msg.author.tag).catch((e) => {
                    msg.channel.send("This bot doesn't have banning privileges!");
                });
            }
        }
    }
}
