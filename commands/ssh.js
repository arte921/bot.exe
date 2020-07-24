const path = process.cwd()
const { exec } = require('child_process')
const { getCustomEmote, processes, saveProcess } = require(path + "/util.js")

const allowedids = [
    "488724416579108865",
    "480024733535174668"
]

module.exports = (msg, argstring) => { 
    if (allowedids.includes(msg.author.id)) {
        const child = exec(argstring, (error, stdout, stderr) => {
            msg.channel.send(error + stderr + stdout).catch(e => console.log(e))
        })
        saveProcess(child)
    } else msg.channel.send("kek no " + getCustomEmote(msg.guild.emojis.cache, "nightmare"))
}