const path = require("path");

const cwd = process.cwd();

const { save, load } = require(path.join(cwd, "database", "index.js"));
const alloweverywhere = require(path.join(cwd, "errands", "alloweverywhere.js"));

const servers = load("servers");

module.exports = (guild) => {
    servers[guild.id] = globalconfig.default_config;   // add in default config
    servers[guild.id].name = guild.name;
    alloweverywhere(guild);

    servers[guild.id] = JSON.parse(JSON.stringify(servers[guild.id])); // Prevent js doing copy by refence and having same entry for every server. Might not be needed anymore. TODO
    save("servers", servers);
    return servers; // to prevent unnessecary disk usage
}