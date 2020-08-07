const fs = require("fs")
const { exec } = require('child_process')

const path = process.cwd()

const config = JSON.parse(fs.readFileSync(path + "/config.json").toString()) 

module.exports = async (msg, argstring) => {
    if (!config.sysadmins.includes(msg.author.id)) return
    exec("git pull", (error, stdout, stderr) => {
        console.log(error, stderr)
        msg.channel.send(stdout).catch(e => console.log(e))
    })
}