const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);
const errors = file([cwd, "utils", "errors.json"]);

module.exports = {
    permission: permissions.moderator,
    code: async (msg, argstring, config) => {
        const servers = load("servers");  
        if (config.blocked_channels.includes(msg.channel.id)) throw "Not allowed here already";
        servers[msg.guild.id].blocked_channels.push(msg.channel.id);
        save("servers", servers);
        msg.react("👍");

        return servers;
    },
    help: `
    Disallows the bot in the channel the current chanel for "normal" members.
    `
}