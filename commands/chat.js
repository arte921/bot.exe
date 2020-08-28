const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));

// TODO prevent errors on incorrect input
module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        const input = argstring.toLowerCase();
        
        const messages = (await file(["temp", `${msg.channel.id}_chat.json`], true))
            .filter(message => message != "")
            .map(message => message
                .toLowerCase()
                .replace(/\*/g, "")
                .replace(/`/g, "")
            );
        
        let responses = [];
        
        messages.forEach((message, index) => {
            if (message == input) {
                responses.push(messages[index - 1]);
            }
        });
        
        if (responses.length > 0) {
            return responses[Math.floor(Math.random() * responses.length)];
        } else {
            return "I don't understand :(";
        }
    },
    help: `
    Usage: \`chat message\`.

    Allows you to talk with the bot. Needs a saved database of messages to work, which can be created using the dump command.
    `
}
