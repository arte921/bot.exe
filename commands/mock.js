const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));


module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        return argstring
            .split("")
            .map((char, index) => index % 2 == 0 ? char.toLowerCase() : char.toUpperCase())
            .join("")
            
    },
    help: `
    Usage: \`mock [text to mock]\`.
    
    Returns the given text stylized lIkE ThIs
    `
}
