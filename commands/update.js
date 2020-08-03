const fs = require("fs")
const { exec } = require('child_process')

const path = process.cwd()

const config = JSON.parse(fs.readFileSync(path + "/config.json").toString()) 

module.exports = async (msg, argstring) => {
    if (!config.sshusers.includes(msg.author.id)) return
    const child = exec("git pull", (error, stdout, stderr) => {
        msg.channel.send(error + stderr + stdout).catch(e => console.log(e))
    })
}