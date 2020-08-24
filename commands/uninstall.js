const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);
const errors = file([cwd, "utils", "errors.json"]);

module.exports = {
    permission: permissions.moderator,
    code: async (msg, argstring, config) => {
        const servers = load("servers");
        const allcommands = fs.readdirSync(path.join(cwd, "commands")).map(command => command.replace(".js", ""));
        if (!argstring || argstring == "") throw errors.syntax;
        if (!allcommands.includes(argstring)) throw "That command doesn't exist!";
        if (config.blocklist.includes(argstring)) throw "Not installed already!";
        servers[msg.guild.id].blocklist.push(argstring);
        save("servers", servers);
        msg.react("👍");

        return servers;
    },
    help: `
    Usage: \`uninstall [command]\`

    Disables a bot command for the current server.
    `
}