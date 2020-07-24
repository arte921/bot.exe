const fs = require("fs")
const path = process.cwd()
const copypasta = JSON.parse(fs.readFileSync(path + "/copypasta.json").toString())

module.exports = () => { 
    msg.channel.send(copypasta.helptext)
}