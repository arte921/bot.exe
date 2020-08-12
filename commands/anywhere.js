const path = require("path");

const cwd = process.cwd();

const { save, load } = require(path.join(cwd, "database", "index.js"));
const alloweverywhere = require(path.join(cwd, "errands", "alloweverywhere.js"));

const globalconfig = load("config");

module.exports = async (msg, argstring, config) => {
    if (!msg.member.permissions.has("KICK_MEMBERS") || !globalconfig.sysadmins.includes(msg.author.id)) {
        msg.channel.send("This command requires administrator privileges.");
        return false;
    }
    
    return alloweverywhere(msg.guild);
};