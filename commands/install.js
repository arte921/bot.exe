const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));

module.exports = {
    permission: permissions.moderator,
    code: async (msg, argstring, config) => {
        const servers = await load("servers");
        const allcommands = fs.readdirSync(path.join(cwd, "commands")).map(command => command.replace(".js", ""));
        if (!argstring || argstring == "") return errors.syntax;
        if (!allcommands.includes(argstring)) return "That command doesn't exist!";
        if (!config.blocklist.includes(argstring)) return "Already installed";
        servers[msg.guild.id].blocklist = servers[msg.guild.id].blocklist.filter(command => command != argstring);
        save("servers", servers);
        msg.react("👍");

        return servers;
    },
    help: `
    Usage: \`install [command]\`

    Eenables a bot command for the current server.
    `
}