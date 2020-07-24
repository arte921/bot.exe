const fs = require("fs")
const path = process.cwd()
const config = JSON.parse(fs.readFileSync(path + "/config.json").toString())
const prefix = config.prefix

let message = msg.content.substr(prefix.length)
let argstring = message.substr(message.indexOf(" ") + 1)