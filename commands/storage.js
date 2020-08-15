const path = require("path");

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
            storage[key] = value;
            save("servers", servers);
            msg.react("👍");
            break;
        case ("load"):
            if (storage[key]) {
                msg.channel.send(storage[key]);
            } else {
                msg.channel.send(`No entry for "${key}"`);
            }
            break;
        default:
            msg.channel.send("That is not a command.")
    }
    
    servers[msg.guild.id].storage = storage;
};