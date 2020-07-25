const fs = require("fs")
const { exec } = require('child_process')
const { kill } = require("process")

const path = process.cwd()

const { getCustomEmote } = require(path + "/util.js")
const config = JSON.parse(fs.readFileSync(path + "/config.json").toString())

const allowedids = config.sshusers

let processes = []

function run (command, channel) {
    const child = exec(command, (error, stdout, stderr) => {
        channel.send(error + stderr + stdout).catch(e => console.log(e))
    })
    processes.push(child)
}

let killall = () => processes.forEach(child => child.kill('SIGINT'))

module.exports = (msg, argstring) => {
    if (allowedids.includes(msg.author.id)) {
        if (argstring == "-k") {
            killall()
            msg.channel.send("now thats a lotta damage!")
        } else {
            run(argstring, msg.channel)
        }
    } else msg.channel.send(`kek no ${getCustomEmote(msg.guild.emojis.cache, "nightmare")}`)
}