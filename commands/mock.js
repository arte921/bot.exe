const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);

module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        msg.channel.send(
            argstring
                .split("")
                .map((char, index) => index % 2 == 0 ? char.toLowerCase() : char.toUpperCase())
                .join("")
        );
    },
    help: 
}
