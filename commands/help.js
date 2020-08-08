const fs = require("fs");
const path = process.cwd();

module.exports = async (msg, argstring, config) => {
    let commands = fs
    .readdirSync(path + "/commands")
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
};
