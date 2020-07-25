const fs = require("fs")
const path = process.cwd()
const copypasta = JSON.parse(fs.readFileSync(path + "/storage.json").toString())

module.exports = async (msg, argstring) => { 
    msg.channel.send(copypasta.misc.helptext)
}