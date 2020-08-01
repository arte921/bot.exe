module.exports = async (msg, argstring) => {
    msg.channel.send(Math.random() < 0.5)
}