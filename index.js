const Discord = require("discord.js")
const ytdl = require('ytdl-core')
const fs = require("fs")
const { indexOf } = require("ffmpeg-static")
const path = process.cwd()

const Settings = JSON.parse(fs.readFileSync(path + "/settings.json").toString())
const emojis = JSON.parse(fs.readFileSync(path + "/emoji.json").toString())
const prefix = Settings.prefix

const client = new Discord.Client()

let startdate = new Date()

let react, commie = false

let connection, dispatcher, lastseenchannel

let helptext = `
***S S H***

All commands prefixed with \`${prefix}\`, without additional spaces.

general commands:
    without arguments:
        ping
        help
        rtfm
        uptime

    with arguments:
        say [text]
        scream [text]
        whisper [text]
        mock [text]
        uwu [text]
        emoji [max emojis per word] [text]

music commands:
    without arguments:
        pause
        resume
        stop

    with arguments:
        play [youtube url]
        volume [percentage]
`

let smallLetters = ["ᵃ", "ᵇ", "ᶜ", "ᵈ", "ᵉ", "ᶠ", "ᵍ", "ʰ", "ⁱ", "ʲ", "ᵏ", "ˡ", "ᵐ", "ⁿ", "ᵒ", "ᵖ", "ᵠ", "ʳ", "ˢ", "ᵗ", "ᵘ", "ᵛ", "ʷ", "ˣ", "ʸ", "ᶻ"]
let smallNumbers = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"]

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("message", async msg => {
    // let mention = msg.mentions.members.first().id
    // if (mention == client.id) msg.channel.send("whomst has summoned the almighty one?")
    
    if (react) {
        let reactions = msg.guild.emojis.cache.filter(emoji => /(communism|stalin|lenin|helpmeplz|nightmare|linus_touch_tips|trollee|haha|gentoo|kirottu_muoto|bororororororooororoororrrroooo|AhHiii|obamaprism)/.test(emoji.name))
        reactions.forEach(emoji => msg.react(emoji))
    }
    
    let match = /(my|his|her|your|mine)/.exec(msg.content)
    if (match && commie) {
        console.log(match.index, match.length)
        let noun = msg.content.slice(match.index + match.length + 1)
        console.log(noun)
        //noun = noun.slice(0, noun.indexOf(" ") + 1)
        msg.channel.send(`our ${noun}* ${getCustomEmote(msg.guild.emojis.cache, "stalin")}`)
    }


    if (msg.author.bot) return
    if (!new RegExp(`^${prefix}[a-z]+`).test(msg.content)) return
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
            dispatcher = connection.play(ytdl(argstring.indexOf("youtube") < 0 ? "https://www.youtube.com/watch?v=dQw4w9WgXcQ" : argstring, { filter: "audioonly" }))
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
        case "react":
            react = !react
            break
        case "commie":
            commie = !commie
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
