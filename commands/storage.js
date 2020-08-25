const Discord = require("discord.js");

const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);
const errors = file([cwd, "utils", "errors.json"]);

module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        const servers = load("servers");
        const storage = servers[msg.guild.id].storage;
        
        let table = new Discord.MessageEmbed();
        for (key in storage) {
            table.addField(key, storage[key]);
        }
        
        return table;
    },
    help: `
    Returns all saved key/value pairs
    `
}