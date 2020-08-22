const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);
const errors = file([cwd, "utils", "errors.json"]);

module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        let firstspace = argstring.indexOf(" ");
        firstspace = firstspace < 0 ? argstring.length : firstspace;
        const time = argstring.substr(0, firstspace);
        const note = argstring.substr(firstspace + 1);
        
        if (isNaN(time) || time == "") throw errors.syntax;

        console.log(time, note);
        setTimeout(() => {
            msg.reply(note);
        }, time * 1000 * 60);
        msg.react("👍");
        
    },
    help: `
    Usage: \`remindme [time] (note)\`.
    
    Pings you with an optional note you give after the specified amount of *minutes*.
    `
}
