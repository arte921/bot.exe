const fs = require("fs");

const { exec } = require("child_process");
const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));


const globalconfig = load("config");

module.exports = {
    permission: permissions.sysadmin,
    code: async (msg, argstring, config) => {
        exec("git pull", (error, stdout, stderr) => {
            console.log(error, stderr);
            msg.channel.send(stdout).catch(console.error);
        });
    },
    help: `    
    Updates the bot from github to the latest version. Clearing the command cache using the clearcache command might be neccesary.
    `
}
