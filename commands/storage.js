const path = require("path");
const Discord = require("discord.js");

const cwd = process.cwd();

const { save, load } = require(path.join(cwd, "database", "index.js"));

module.exports = async (msg, argstring, config) => {
    const splitargstring = argstring.split(" ");
    const command = splitargstring[0];
    const key = splitargstring[1];

    const servers = load("servers");
    const storage = servers[msg.guild.id].storage;

    switch (command) {
        case "save":
            const value = splitargstring.slice(2).join(" ");
            if (key && value && storage[key]) {
                storage[key] = value;
                save("servers", servers);
                msg.react("👍");
            } else {
                msg.channel.send(`Please provide a key and some info to store at the key.`);
            }

            break;
        case "load":
            if (storage[key]) {
                msg.channel.send(storage[key]);
            } else {
                msg.channel.send(`No entry for "${key}"`);
            }
            break;
        case "all":
            let table = new Discord.MessageEmbed();
            for (key in storage) {
                table.addField(key, storage[key]);
            }
            msg.channel.send(table);
            break;
        default:
            msg.channel.send("That is not a command.")
    }
    
    servers[msg.guild.id].storage = storage;
};