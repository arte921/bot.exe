const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));


module.exports = {
    permission: permissions.moderator,
    code: async (msg, argstring, config) => {
        const servers = load("servers");  
        if (!argstring || argstring == "") return "`" + servers[msg.guild.id].trialmodrole + "`";
        servers[msg.guild.id].trialmodrole = argstring;
        save("servers", servers);
        msg.react("👍");

        return servers;
    },
    help: `
    Usage: \`trialrole [role name]\`.

    Sets the name of the role which is the trial admin role. People with a role with given name have the extra ability to clear, mute and unmute.
    `
}