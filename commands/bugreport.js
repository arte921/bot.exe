const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file(["utils", "permissions.json"], true);
const errors = file(["utils", "errors.json"], true);
const globalconfig = load("config");

module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        if (!argstring || argstring == "") return errors.syntax;
        globalconfig.sysadmins.forEach(adminid => msg.client.users.cache.get(adminid).send(
            `\`${msg.author.tag}\` from \`${msg.guild.name}\`
            \`\`\`${argstring}\`\`\``
        ));
        msg.react("👍");
    },
    help: `
    Usage: bugreport [text]

    Sends a message with given text to the bot administrator. Use this to report problems, abuse or otherwise. You can also consider openin an issue on github if it's less urgent.
    Note that your discord tag and the server the command is issued from will also be sent.
    `
}