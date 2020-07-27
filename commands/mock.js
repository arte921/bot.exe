const path = process.cwd()
const { mock } = require(path + "/util.js")

module.exports = async (msg, argstring) => { 
    msg.channel.send(mock(argstring))
}