const fs = require("fs");
const path = require("path");

const cwd = process.cwd();

const cuteness = JSON.parse(fs.readFileSync(path.join(cwd, "assets", "cuteness.json")));

module.exports = async (msg, argstring, config) => {
    msg.channel.send(cuteness[Math.floor(Math.random() * cuteness.length)]);
};