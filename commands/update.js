const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

const cwd = process.cwd();

const globalconfig = JSON.parse(fs.readFileSync(path.join(cwd, "config.json")).toString());

module.exports = async (msg, argstring, config) => {
    if (!globalconfig.sysadmins.includes(msg.author.id)) return;
    exec("git pull", (error, stdout, stderr) => {
        console.log(error, stderr);
        msg.channel.send(stdout).catch((e) => console.log(e));
    });
};
