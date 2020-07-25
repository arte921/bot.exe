const Discord = require("discord.js")
const fs = require("fs")
const path = process.cwd()

const config = JSON.parse(fs.readFileSync(path + "/config.json").toString())
const storage = JSON.parse(fs.readFileSync(path + "/storage.json").toString())
const prefix = config.prefix

const client = new Discord.Client()

let startdate = new Date()

let commandcache = {}

let spam = false
const debug = false

client.on("ready", () => console.log(`Logged in as ${client.user.tag}`))

client.on("message", async msg => {

    if (!new RegExp(`^${prefix}[a-z]+`).test(msg.content) || (msg.author.bot && !spam)) return

    let message = msg.content.substr(prefix.length)
    let splitmsg = message.split(" ")
    let args = splitmsg.slice(1)
    let argstring = message.substr(message.indexOf(" ") + 1)
    let command = splitmsg[0]

    console.log(msg.author.tag, "   ", message)

    if (command in commandcache && !debug) {
        commandcache[command](msg, argstring)
        console.log("got from ram")
    } else {
        let commandfilepath = path + "/commands/" + command + ".js"
        if (fs.existsSync(commandfilepath)) {
            commandcache[command] = require(commandfilepath)
            commandcache[command](msg, argstring)
            console.log("got from disk")
        } else {
            msg.channel.send("wdym " + command.toLowerCase().split("").map((char, index) => {
                return (index % 2 == 0) ? char.toLowerCase() : char.toUpperCase()
            }).join(""))
        }
    }
})

console.log("logging in")
client.login(config.token)