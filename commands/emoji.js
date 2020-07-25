const fs = require("fs")
const path = process.cwd()

const { sendLongMessage } = require(path + "/util.js")

const emojis = JSON.parse(fs.readFileSync(path + "/emoji.json").toString())

function getEmoji(keyword, maxemoji) {
    let candidates = emojis.filter(entry => entry[1].join(" ").indexOf(keyword.toLowerCase()) >= 0)
    if (candidates.length > 0) {
        let a = ""
        for (let i=0; i < maxemoji && i < candidates.length; i++) a += candidates[i][0]
        return a
    } else return ""
}

module.exports = (msg, argstring) => {
    let args = argstring.split(" ")
    sendLongMessage(msg.channel, args.slice(1).map(word => word + getEmoji(word, args[0])).join(" "))
}