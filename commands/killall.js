const path = process.cwd()
const { killall } = require(path + "/util.js")

module.exports = msg => { 
    killall()
    msg.channel.send("now thats a lotta damage")
}