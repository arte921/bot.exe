const Discord = require("discord.js")
const ytdl = require('ytdl-core')
const fs = require("fs")
const { indexOf } = require("ffmpeg-static")
const path = process.cwd()

const Settings = JSON.parse(fs.readFileSync(path + "/settings.json").toString())
const emojis = JSON.parse(fs.readFileSync(path + "/emoji.json").toString())
const copypasta = JSON.parse(fs.readFileSync(path + "/copypasta.json").toString())
const prefix = Settings.prefix

const client = new Discord.Client()

let startdate = new Date()

let react, commie, simp, interject, anthem, spam = false

let connection, dispatcher, lastseenchannel

let smallLetters = ["ᵃ", "ᵇ", "ᶜ", "ᵈ", "ᵉ", "ᶠ", "ᵍ", "ʰ", "ⁱ", "ʲ", "ᵏ", "ˡ", "ᵐ", "ⁿ", "ᵒ", "ᵖ", "ᵠ", "ʳ", "ˢ", "ᵗ", "ᵘ", "ᵛ", "ʷ", "ˣ", "ʸ", "ᶻ"]
let smallNumbers = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"]

client.on("ready", () => console.log(`Logged in as ${client.user.tag}`))

client.on("message", async msg => {

    if (msg.author.bot && !spam) return
    
    if (react) {
        let reactions = msg.guild.emojis.cache.filter(emoji => /(communism|stalin|lenin|helpmeplz|nightmare|linus_touch_tips|trollee|haha|gentoo|kirottu_muoto|bororororororooororoororrrroooo|AhHiii|obamaprism)/.test(emoji.name))
        reactions.forEach(emoji => msg.react(emoji))
    }
    
    if (commie) {
        let match = /(^| )(my|his|her|your|mine)($| )/.exec(msg.content)
        if(match) {
            let noun = msg.content.slice(match.index + match.length - 1)
            msg.channel.send(`our ${noun}* ${getCustomEmote(msg.guild.emojis.cache, "stalin")}`)
        }
    }
        
    if (simp) {
        let match = /(^| )(girl|female|woman|lady)($| )/.exec(msg.content)
        if (match) msg.channel.send (copypasta.simp)
    }

    if (anthem) {
        let match = /(^| )(anthem)($| )/.exec(msg.content)
        if (match) msg.channel.send (copypasta.anthem)
    }

    if (interject) {
        let match = /(^| )(linux|Linux)($| )/.exec(msg.content)
        if (match) msg.channel.send (copypasta.interjection)
    }

    if (!new RegExp(`^${prefix}[a-z]+`).test(msg.content)) return
    lastchannel = msg.channel
    let message = msg.content.substr(prefix.length)
    console.log(msg.author.tag, "   ", message)
    let splitmsg = message.split(" ")
    let args = splitmsg.slice(1)
    let argstring = message.substr(message.indexOf(" ") + 1)

    switch (splitmsg[0]) {
        case "ping":
            msg.channel.send("helo " + msg.author.username)
            break
        case "help":
            msg.channel.send("RTFM")
            msg.channel.send("ssh-rtfm")
            break
        case "rtfm":
            msg.channel.send(copypasta.helptext)
            break
        case "say":
            msg.channel.send(argstring == ":)" ? "(:" : argstring)
            break
        case "scream":
            sendLongMessage(msg.channel, argstring.toUpperCase().split("").join(" "), "***")
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
            dispatcher = connection.play(ytdl(argstring.indexOf("youtube") < 0 ? "https://www.youtube.com/watch?v=U06jlgpMtQs" : argstring, { filter: "audioonly" }))
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
                msg.channel.send("aight, imma head out")
                await lastseenchannel.leave()
            } catch(e) { msg.channel.send("Nothing playing!") }
            break
        case "volume":
            try{
                dispatcher.setVolume(argstring / 100)
            } catch(e) { msg.channel.send("Nothing playing!") }
            break
        case "emoji":
            sendLongMessage(msg.channel, args.slice(1).map(word => word + getEmoji(word, args[0])).join(" "))
            break
        case "systemctl":
            console.log(argstring)
            switch (argstring){
                case "commie":
                    commie = !commie
                    msg.channel.send(commie)
                    break
                case "simp":
                    simp = !simp
                    msg.channel.send(simp)
                    break
                case "react":
                    react = !react
                    msg.channel.send(react)
                    break
                case "gnu":
                    interject = !interject
                    msg.channel.send(interject)
                    break
                case "anthem":
                    anthem = !anthem
                    msg.channel.send(anthem)
                    break
                case "spam":
                    spam = !spam
                    msg.channel.send(spam)
                    break
                default:
                    msg.channel.send(`Failed to enable unit, unit ${argstring}.service does not exist.`)
                    break
            }
            break
        default:
            msg.channel.send("wdym " + splitmsg[0].toLowerCase().split("").map((char, index) => {
                return (index % 2 == 0) ? char.toLowerCase() : char.toUpperCase()
            }).join(""))
            break
    }
})

function sendLongMessage (channel, message, markup = "") {
    let chunksize = 1500
    let lastindex = 0
    let i = 0
    while (i <= message.length) {
        i+= chunksize
        channel.send(markup + message.slice(lastindex, i) + markup)
        lastindex = i

    }
}

let getCustomEmote = (cache, name) => cache.find(emoji => emoji.name == name)

function getEmoji(keyword, maxemoji) {
    let candidates = emojis.filter(entry => entry[1].join(" ").indexOf(keyword.toLowerCase()) >= 0)
    if (candidates.length > 0) {
        let a = ""
        for (let i=0; i < maxemoji && i < candidates.length; i++) a += candidates[i][0]
        return a
    } else return ""
}

console.log("logging in")
client.login(Settings.token)
