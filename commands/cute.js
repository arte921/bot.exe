const path = require("path");
const cwd = process.cwd();

const { save, load } = require(path.join(cwd, "database", "index.js"));

module.exports = async (msg, argstring, config) => {
    const cuteness = load("config").cuteness;
    
    msg.channel.send(cuteness[Math.floor(Math.random() * cuteness.length)]);
};