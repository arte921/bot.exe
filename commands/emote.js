const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));


module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        let match = argstring.match(/<[:a-zA-Z:0-9]+>/);
        if (match) {
            const emote = match[0];
            const id = emote.split(":")[2].slice(0, -1);
            return `https://cdn.discordapp.com/emojis/${id}.png`;
        } else {
            return errors.syntax;
        }
    },
    help: `
    Usage: \`emote [discord server custom emote]\`.
    
    This will not work with unicode or default discord emotes.
    `
}