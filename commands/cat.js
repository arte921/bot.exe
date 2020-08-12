const fs = require("fs");
const path = require("path");

const cwd = process.cwd();

const catdir = path.join(cwd, "assets", "cats");

module.exports = async (msg, argstring, config) => {
    const cats = fs.readdirSync(catdir);
    const cat = cats[Math.floor(Math.random() * cats.length)];
    const catfilepath = path.join(catdir, cat);

    msg.channel.send({files: [catfilepath]});
};