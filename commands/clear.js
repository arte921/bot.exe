
const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const isint = require(path.join(cwd, "utils", "isint.js"));
const permissions = file([cwd, "utils", "permissions.json"]);
const errors = file([cwd, "utils", "errors.json"]);

module.exports = {
    permission: permissions.trialmod,
    code: async (msg, argstring, config) => {
        
        if (!isint(argstring) || argstring > 100) throw errors.syntax;
        
        msg.channel.bulkDelete(argstring).catch(() => {
            throw errors.botperms;
        });
    },
    help: `
    Usage: \`clear [amount]\`
    
    Deletes the given amount of messages in the current channel. Thanks to Discord api limitations, you can only clear up to 100 messages at once.`
}
