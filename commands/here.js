const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);

module.exports = {
    permission: permissions.moderator,
    code: async (msg, argstring, config) => {
        const servers = load("servers");  
        if (!config.allowed_channels.includes(msg.channel.id)) {
            servers[msg.guild.id].allowed_channels.push(msg.channel.id);
            save("servers", servers);
            msg.react("👍");
        } else {
            msg.channel.send("Already allowed here.");
        }

        return servers;
    },
    help: `
    Allows the bot in the channel the command is ran from for all users.
    `
}