const path = require("path");

const cwd = process.cwd();


const alloweverywhere = require(path.join(cwd, "utils", "alloweverywhere.js"));

const globalconfig = load("config");

const permissions = file([cwd, "utils", "permissions.json"]);

module.exports = {
    help: ``,
    permission: 0,
    code: async (msg, argstring, config) => {
        if (!msg.member.permissions.has("KICK_MEMBERS") && !globalconfig.sysadmins.includes(msg.author.id)) {
            msg.channel.send("This command requires administrator privileges.");
            return;
        }
        
        msg.react("👍");
        return alloweverywhere(msg.guild);
    }
}