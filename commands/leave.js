const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));


module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        if (!config.selfroles.includes(argstring)) return "That's not a self assignable role!";
        const role = msg.guild.roles.cache.find(role => role.name == argstring);
        if (!role) return "That's not a role in this server!";
        msg.member.roles.remove(role).catch(e => {
            return permissions.botperms;
        });
        msg.react("👍");
    },
    help: `
    Usage: join [role name].

    Removes the given role from user. This only works if the role is whitelisted for self assigning.
    `
}
