
const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);
const errors = file([cwd, "utils", "errors.json"]);

module.exports = {
    permission: permissions.trialmod,
    code: async (msg, argstring, config) => { 
        const user = msg.mentions.users.first();
        if (!user) return errors.syntax;
        const member = msg.guild.member(user);
        if (member) {
            const role = msg.guild.roles.cache.find(role => role.name == "muted");
            member.roles.remove(role).catch(e => {
                return permissions.botperms;
            });
        } 
    },
    help: `
    Usage: unmute [mention].
    
    Removes the \`muted\` role from the mentioned user.`
}
