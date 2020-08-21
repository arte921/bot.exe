const path = require("path");
const cwd = process.cwd();
const file = path.resolve(cwd, "assets", "water.png");

module.exports = {
    help: ``,
    permission: 0,
    code: async (msg, argstring, config) => {
        msg.channel.send("**I HAVE ARE HAS OBTAINED THE CRAVED *W A T E R***");
        msg.channel.send({files: [file]});
    }
}
