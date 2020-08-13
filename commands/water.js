const path = require("path");
const cwd = process.cwd();
const file = path.resolve(cwd, "assets", "water.png");

module.exports = async (msg, argstring, config) => {
    msg.channel.send("**I HAVE OBTAINED THE WATER**");
    msg.channel.send({files: [file]});
};
