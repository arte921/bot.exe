const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);
const errors = file([cwd, "utils", "errors.json"]);

module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        msg.channel.send(
            "***" + argstring.toUpperCase().split("").join(" ") + "***"
        ).catch(e => {return errors.overflow});
    },
    help: `
    Usage: \`scream [text]\`.
    
    Returns the given text but stylized ***L I K E   T H I S***.
    `
}
