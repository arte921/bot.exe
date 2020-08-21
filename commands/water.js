const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);
const worter = path.resolve(cwd, "assets", "water.png");

module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        msg.channel.send("**I HAVE ARE HAS OBTAINED THE CRAVED *W A T E R***");
        msg.channel.send({files: [worter]});
    },
    help: `
    Obtains ***W A T E R***
    `
}
