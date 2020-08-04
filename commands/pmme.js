module.exports = async (msg, argstring) => {
    msg.author.send(argstring).catch((e) => {})
}