const path = process.cwd()
const { getCustomEmote, run } = require(path + "/util.js")

const allowedids = [
    "488724416579108865",   // me
    "480024733535174668"    // blursed bot
]

module.exports = (msg, argstring) => { 
    if (allowedids.includes(msg.author.id)) {
        run(argstring, msg.channel)
    } else msg.channel.send(`kek no ${getCustomEmote(msg.guild.emojis.cache, "nightmare")}`)
}