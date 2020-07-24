const Discord = require("discord.js")
const ytdl = require('ytdl-core')
const fs = require("fs")
const { indexOf } = require("ffmpeg")
const path = process.cwd()

const config = JSON.parse(fs.readFileSync(path + "/config.json").toString())
const emojis = JSON.parse(fs.readFileSync(path + "/emoji.json").toString())
const storage = JSON.parse(fs.readFileSync(path + "/storage.json").toString())
const prefix = config.prefix

const client = new Discord.Client()

let startdate = new Date()

let react, commie, simp, interject, anthem, spam = false

client.on("ready", () => console.log(`Logged in as ${client.user.tag}`))

client.on("message", async msg => {

    // if (msg.author.bot && !spam) return
    
    if (react) {
        let reactions = msg.guild.emojis.cache.filter(emoji => /(communism|stalin|lenin|helpmeplz|nightmare|linus_touch_tips|trollee|haha|gentoo|kirottu_muoto|bororororororooororoororrrroooo|AhHiii|obamaprism)/.test(emoji.name))
        reactions.forEach(emoji => msg.react(emoji))
    }
    
    if (commie) {
        let match = /(^| )(my|his|her|your|mine)($| )/.exec(msg.content.toLowerCase())
        if(match) {
            let noun = msg.content.slice(match.index + match.length - 1)
            msg.channel.send(`our ${noun}* ${getCustomEmote(msg.guild.emojis.cache, "stalin")}`)
        }
    }
    
    storage.interjections.forEach (interjectionobject => {
        if (!interjectionobject.enabled) return
        let match = new RegExp(interjectionobject.regex).exec(msg.content.toLowerCase())
        if (match) msg.channel.send(interjectionobject.copypasta + "bruh")
    })

    if (!new RegExp(`^${prefix}[a-z]+`).test(msg.content)) return

    let message = msg.content.substr(prefix.length)
    let splitmsg = message.split(" ")
    let args = splitmsg.slice(1)
    let argstring = message.substr(message.indexOf(" ") + 1)

    console.log(msg.author.tag, "   ", message)

    let commandfilepath = path + "/commands/" + splitmsg[0] + ".js"
    console.log(commandfilepath)
    if (fs.existsSync(commandfilepath)) {
        require(commandfilepath)(msg, argstring)
    } else {
        msg.channel.send("wdym " + splitmsg[0].toLowerCase().split("").map((char, index) => {
            return (index % 2 == 0) ? char.toLowerCase() : char.toUpperCase()
        }).join(""))
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

function getEmoji(keyword, maxemoji) {
    let candidates = emojis.filter(entry => entry[1].join(" ").indexOf(keyword.toLowerCase()) >= 0)
    if (candidates.length > 0) {
        let a = ""
        for (let i=0; i < maxemoji && i < candidates.length; i++) a += candidates[i][0]
        return a
    } else return ""
}

console.log("logging in")
client.login(config.token)