
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
            member.roles.add(role).catch(e => {
                throw permissions.botperms;
            });
        }        
    },
    help: `
    Usage: \`mute [mention]\`.
    
    Assigns the \`muted\` role to the mentioned user. Note that to actually make this command useful, you will also need to create a role called \`muted\`, and revoke it's permissions to speak.`
}
