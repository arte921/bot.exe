const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);
const errors = file([cwd, "utils", "errors.json"]);

module.exports = {
    permission: permissions.moderator,
    code: async (msg, argstring, config) => {  
        const servers = load("servers");      
        if (servers[msg.guild.id].blocked_channels.includes(msg.channel.id)) {
            const index = servers[msg.guild.id].blocked_channels.indexOf(msg.channel.id);
            servers[msg.guild.id].blocked_channels.splice(index, 1);
            save("servers", servers);
            msg.react("👍");
            return servers;
        } else {
            throw "I was allowed here already!";
        }
    },
    help: `
    Allows the bot for "normal" members in the current channel`
}