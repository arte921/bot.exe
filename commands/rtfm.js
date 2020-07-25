const fs = require("fs")
const path = process.cwd()
const copypasta = JSON.parse(fs.readFileSync(path + "/storage.json").toString())

module.exports = msg => { 
    msg.channel.send(copypasta.misc.helptext)
}