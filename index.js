const fs = require("fs")
const path = process.cwd()

const Settings = JSON.parse(fs.readFileSync(path + "/settings.json").toString())
const prefix = Settings.prefix

const Discord = require("discord.js")
const client = new Discord.Client()

let startdate = new Date()

let helptext = `
RTFM Time :partying_face:

ping, help, rtfm, say, scream, whisper, mock
`

let smallLetters = ["ᵃ", "ᵇ", "ᶜ", "ᵈ", "ᵉ", "ᶠ", "ᵍ", "ʰ", "ⁱ", "ʲ", "ᵏ", "ˡ", "ᵐ", "ⁿ", "ᵒ", "ᵖ", "ᵠ", "ʳ", "ˢ", "ᵗ", "ᵘ", "ᵛ", "ʷ", "ˣ", "ʸ", "ᶻ"]
let smallNumbers = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"]

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("message", msg => {
    if (!new RegExp(`^${prefix}[a-z]+`).test(msg)) return
    lastchannel = msg.channel
    let message = msg.content.substr(prefix.length)
    console.log(msg.author.username, "   ", message)
    let splitmsg = message.split(" ")
    let args = splitmsg.slice(1)
    let argstring = message.substr(message.indexOf(" "))


    //msg.channel.send("***S S H***")

    let failedbefore = false

    switch (splitmsg[0]) {
        case "ping":
            msg.channel.send("helo " + msg.author.username)
            break
        case "help":
            msg.channel.send("RTFM")
            msg.channel.send("ssh-rtfm")
            break
        case "rtfm":
            msg.channel.send(helptext)
            break
        case "say":
            msg.channel.send(argstring)
            break
        case "scream":
            msg.channel.send("***" + argstring.toUpperCase().split("").join(" ") + "***")
            break
        case "whisper":
            msg.channel.send(argstring.split("").map(char => {
                if (/([a-zA-Z])/.test(char)) return smallLetters[char.toLowerCase().charCodeAt(0) - 97]
                else if (/([0-9])/.test(char)) return smallNumbers[char]
                else return char
            }).join(""))
            break
        case "mock":
            msg.channel.send(argstring.toLowerCase().split("").map((char, index) => {
                return (index % 2 == 0) ? char.toLowerCase() : char.toUpperCase()
            }).join(""))
            break
        case "uwu":
            msg.channel.send(argstring.replace(/[prl]/g, "w"))
            break
        case "uptime":
            let diff = new Date() - startdate
            let days = Math.floor(diff / (1000 * 60 * 60 * 24))
            let hours = Math.floor(diff / (1000 * 60 * 60))
            let mins = Math.floor(diff / (1000 * 60))
            let seconds = Math.floor(diff / 1000)
            msg.channel.send(`${days} days, ${hours} hours, ${mins} minutes, ${seconds} seconds`)
            break
        default:
            msg.channel.send("wdym")
            break
    }
})

client.login(Settings.token)