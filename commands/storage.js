const Discord = require("discord.js");

const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));


module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        const servers = await load("servers");
        const storage = servers[msg.guild.id].storage;
        
        let table = new Discord.MessageEmbed();
        for (key in storage) {
            table.addField(key, storage[key]);
        }
        
        msg.channel.send(table);
    },
    help: `
    Returns all saved key/value pairs
    `
}