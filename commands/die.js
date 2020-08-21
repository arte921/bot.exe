const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

const cwd = process.cwd();

const { save, load } = require(path.join(cwd, "database", "index.js"));

const globalconfig = load("config");

module.exports = {
    help: ``,
    permission: 0,
    code: async (msg, argstring, config) => {
        if (!globalconfig.sysadmins.includes(msg.author.id)) return;
        await msg.react("👋");
        process.exit();
    }
}
