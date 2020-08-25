const path = require("path");

const cwd = process.cwd();

const { save, load, file } = require(path.join(cwd, "database", "index.js"));

let servers = load("servers");
const globalconfig = load("config");

module.exports = (guild) => {
    servers[guild.id] = load("config").default_config || file(["database", "default_config.json"], true);   // add in default config
    servers[guild.id].name = guild.name;

    save("servers", servers);
    return servers; // to prevent unnessecary disk usage
}