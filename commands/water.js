const path = require("path");
const cwd = process.cwd();
const file = path.resolve(cwd, "assets", "water.png");

module.exports = async (msg, argstring, config) => {
    msg.channel.send("**I HAVE ARE HAS OBTAINED THE CRAVED *WATER***");
    msg.channel.send({files: [file]});
};
