const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));

module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        const recievers = msg.mentions.users.map(user => user.id);

        if (recievers.length != 2) return "Please mention 2 people!";
        let total = 0;
        for (const id of recievers) total += id - 0;
        return `${(total % 50) + 50}% match 😳`;
    },
    help: `
    Usage: match [@mention1 @mention2]
    `
}