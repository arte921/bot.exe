const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);
const errors = file([cwd, "utils", "errors.json"]);

module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        if (config.selfroles.length == 0) return "No selfroles configured. See addrole and delrole commands."
        return config.selfroles.join("\n");
    },
    help: `
    Lists all available self assignable roles.
    `
}