const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);

module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        let firstspace = argstring.indexOf(" ");
        firstspace = firstspace < 0 ? argstring.length : firstspace;
        const time = argstring.substr(0, firstspace);
        const note = argstring.substr(firstspace + 1);
        
        if (isNaN(time) || time == "") {
            msg.channel.send("Please provide an amount of minutes to wait!");
            return;
        }

        console.log(time, note);
        setTimeout(() => {
            msg.reply(note);
        }, time * 1000 * 60);
        msg.react("👍");
        
    }
}
