const fs = require("fs")
const path = process.cwd()
const copypasta = JSON.parse(fs.readFileSync(path + "/storage.json").toString())
const config = JSON.parse(fs.readFileSync(path + "/config.json").toString())

let commands = fs
    .readdirSync(path + "/commands")
    .filter(
        (command) => !config.blocklist.some(
            blockedcommand => command.includes(blockedcommand)
        )
    )
    .join("\n")
    .replace(/.js/g, "")

let starttext = `
All commands prefixed with ${config.prefix}, without additional spaces.

Available commands:

`

module.exports = async (msg, argstring) => {
    msg.channel.send(starttext + commands)
}