const fs = require("fs");

module.exports = async (msg, argstring, config) => {
    if (argstring == "") {
        let commands = fs
        .readdirSync("./commands")
        .filter(
            (command) =>
                !config.blocklist.some((blockedcommand) =>
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
        const details = JSON.parse(fs.readFileSync("./assets/help.json"));
        if (!config.blocklist.includes(argstring) && details[argstring]) {
            msg.channel.send(details[argstring]);
        } else {
            msg.channel.send(`No help page found for "${argstring}"`);
        }
    }

};
