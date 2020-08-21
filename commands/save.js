const path = require("path");

const cwd = process.cwd();

const { save, load } = require(path.join(cwd, "database", "index.js"));

module.exports = async (msg, argstring, config) => {
    let firstspace = argstring.indexOf(" ");
    const key = argstring.substr(0, firstspace);
    const value = argstring.substr(firstspace + 1);
    
    const servers = load("servers");
    const storage = servers[msg.guild.id].storage;

    console.log(key, value);
    if (key && value) {
        storage[key] = value;
        save("servers", servers);
        msg.react("👍");
    } else {
        msg.channel.send(`Please provide a key and some info to store at the key.`);
    }

    return servers;
}