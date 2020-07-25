const fs = require("fs")
const path = process.cwd()

const storage = JSON.parse(fs.readFileSync(path + "/storage.json").toString())

module.exports = async (msg, argstring) => { 
    msg.channel.send(argstring.split("").map(char => {
        if (/([a-zA-Z])/.test(char)) return storage.misc.smallLetters[char.toLowerCase().charCodeAt(0) - 97]
        else if (/([0-9])/.test(char)) return storage.misc.smallNumbers[char]
        else return char
    }).join(""))
    
}