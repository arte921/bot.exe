const path = require("path");

const cwd = process.cwd();

const { save, load } = require(path.join(cwd, "database", "index.js"));

const servers = load("servers");

module.exports = (guild) => {
    servers[guild.id].allowed_channels = guild.channels.cache  // loop trough channels, add all channels to approved channels
        .filter((channel) => channel.type == "text")    // Only include text channels
        .map((channel) => channel.id);  // Only save channel id's
    save("servers", servers);
    return servers; // to prevent unnessecary disk usage
}