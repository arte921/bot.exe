const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));


module.exports = {
    permission: permissions.moderator,
    code: async (msg, argstring, config) => {     
        const servers = await load("servers");   
        servers[msg.guild.id].blocked_channels = msg.guild.channels.cache  // loop trough channels, add all channels to approved channels
            .filter((channel) => channel.type == "text")    // Only include text channels
            .map((channel) => channel.id);  // Only save channel id's
        save("servers", servers);
        msg.react("👍");
        return servers;
    },
    help: `
    Disallows the bot for "normal" members in *all* channels of the server.`
}