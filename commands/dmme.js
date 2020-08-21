const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);

module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        const message = argstring != "" ? argstring : "Hello :D";
        msg.author.send(message).catch((e) => {});
    },
    help: 
}
