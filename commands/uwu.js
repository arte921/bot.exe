const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));


module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => argstring.replace(/[prl]/g, "w"),
    help: `
    Usage: \`uwu [text]\`.
    
    Returns the given text but stylized wike this.
    `
}
