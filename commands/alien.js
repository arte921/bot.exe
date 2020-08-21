const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);

module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        msg.delete().catch((e) => {});    
        const addition = argstring == "" ? "" : "**: " + argstring + "**";
        msg.channel.send("✨👄👀" + addition);
    },
    help: `
    Usage: alien (message)
    
    Summons a cute alien, which can optionally say a message.
    `
}