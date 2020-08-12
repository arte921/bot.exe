const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

const cwd = process.cwd();

const { save, load } = require(path.join(cwd, "database", "index.js"));

const globalconfig = load("config");

module.exports = async (msg, argstring, config) => {
    if (!globalconfig.sysadmins.includes(msg.author.id)) return false;
    exec("git pull", (error, stdout, stderr) => {
        console.log(error, stderr);
        msg.channel.send(stdout).catch((e) => console.log(e));
    });
};
