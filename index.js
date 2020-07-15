const Discord = require("discord.js")
const ytdl = require('ytdl-core')
const fs = require("fs")
const path = process.cwd()

const Settings = JSON.parse(fs.readFileSync(path + "/settings.json").toString())
const prefix = Settings.prefix

const client = new Discord.Client()

let startdate = new Date()

let connection, dispatcher, lastseenchannel

let helptext = `
RTFM Time :partying_face:

ping, help, rtfm, say, scream, whisper, mock
`

let smallLetters = ["ᵃ", "ᵇ", "ᶜ", "ᵈ", "ᵉ", "ᶠ", "ᵍ", "ʰ", "ⁱ", "ʲ", "ᵏ", "ˡ", "ᵐ", "ⁿ", "ᵒ", "ᵖ", "ᵠ", "ʳ", "ˢ", "ᵗ", "ᵘ", "ᵛ", "ʷ", "ˣ", "ʸ", "ᶻ"]
let smallNumbers = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"]

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("message", async msg => {
    if (!new RegExp(`^${prefix}[a-z]+`).test(msg)) return
    lastchannel = msg.channel
    let message = msg.content.substr(prefix.length)
    console.log(msg.author.tag, "   ", message)
    let splitmsg = message.split(" ")
    let args = splitmsg.slice(1)
    let argstring = message.substr(message.indexOf(" "))

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
            let seconds = Math.floor(diff / 1000)
            let mins = Math.floor(seconds / 60)
            let hours = Math.floor(mins / 60)
            let days = Math.floor(hours / 24)
            msg.channel.send(`${days} days, ${hours % 24} hours, ${mins % 60} minutes, ${seconds % 60} seconds`)
            break
        case "play":
            if (lastseenchannel == null && !msg.member.voice.channel) {
                msg.channel.send("join a channel yourself blyat")
                return
            }
            if (msg.member.voice.channel) lastseenchannel = msg.member.voice.channel
            connection = await lastseenchannel.join()
            dispatcher = connection.play(ytdl(argstring, { filter: "audioonly" }))
            break
        case "pause":
            try{
                dispatcher.pause()
            } catch(e) { msg.channel.send("Nothing playing!") }            
            break
        case "resume":
            try{
                dispatcher.resume()
            } catch(e) { msg.channel.send("Nothing playing!") }
            break
        case "stop":
            try{
                dispatcher.destroy()
                await lastseenchannel.leave()
            } catch(e) { msg.channel.send("Nothing playing!") }            
            break
        case "volume":
            try{
                dispatcher.setVolume(argstring)
            } catch(e) { msg.channel.send("Nothing playing!") }            
            break
        default:
            msg.channel.send("wdym " + splitmsg[0].toLowerCase().split("").map((char, index) => {
                return (index % 2 == 0) ? char.toLowerCase() : char.toUpperCase()
            }).join(""))
            break
    }
})

console.log("logging in")
client.login(Settings.token)