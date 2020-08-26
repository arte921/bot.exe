const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);
const errors = file([cwd, "utils", "errors.json"]);

module.exports = {
    permission: permissions.trialmod,
    code: async (msg, argstring, config) => {
        if (!config.selfroles.includes(argstring)) return "That's not a self assignable role!";
        const role = msg.guild.roles.cache.find(role => role.name == argstring);
        if (!role) return "That's not a role in this server!";
        msg.member.roles.remove(role).catch(e => {
            throw permissions.botperms;
        });
        msg.react("👍");
    },
    help: `
    Usage: join [role name].

    Removes the given role from user. This only works if the role is whitelisted for self assigning.
    `
}
