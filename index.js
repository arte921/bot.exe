const Discord = require("discord.js")
const fs = require("fs")
const path = process.cwd()

const config = JSON.parse(fs.readFileSync(path + "/config.json").toString())

const client = new Discord.Client()

let commandcache = {}

client.on("ready", () => console.log(`Logged in as ${client.user.tag}`))

console.log(config.allowspam)

client.on("message", async msg => {

    if (!new RegExp(`^${config.prefix}[a-z]+`).test(msg.content) || (msg.author.bot && !config.allowspam)) return

    let message = msg.content.substr(config.prefix.length)
    let firstspace = message.indexOf(" ")
    let command = message.substr(0, firstspace)
    let argstring = message.substr(firstspace + 1)

    console.log(msg.author.tag, "   ", message)

    if (command in commandcache && config.caching) {
        commandcache[command](msg, argstring)
    } else {
        let commandfilepath = path + "/commands/" + command + ".js"
        if (fs.existsSync(commandfilepath)) {
            commandcache[command] = require(commandfilepath)
            commandcache[command](msg, argstring)
        } else {
            msg.channel.send("wdym " + command.toLowerCase().split("").map((char, index) => {
                return (index % 2 == 0) ? char.toLowerCase() : char.toUpperCase()
            }).join(""))
        }
    }
})

console.log("logging in")
client.login(config.token)