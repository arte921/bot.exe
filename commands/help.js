const fs = require("fs");
const path = require("path");

const cwd = process.cwd();

const details = JSON.parse(fs.readFileSync(path.join(cwd, "assets", "help.json")));

module.exports = async (msg, argstring, config) => {
    if (argstring == "") {
        let commands = fs
        .readdirSync(path.join(cwd, "commands"))
        .filter(
            (command) =>
                !config.blocklist.commands.some((blockedcommand) =>
                    command.includes(blockedcommand)
                )
        )
        .join("\n")
        .replace(/.js/g, "");
    
let starttext = `
All commands prefixed with ${config.prefix}, without additional spaces.

Available commands:

`;
    
        msg.channel.send(starttext + commands);
    } else {
        if (!config.blocklist.commands.includes(argstring) && details[argstring]) {
            msg.channel.send(details[argstring]);
        } else {
            msg.channel.send(`No help page found for "${argstring}"`);
            console.log(details[argstring]);
        }
    }

};
