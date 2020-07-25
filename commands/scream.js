module.exports = async (msg, argstring) => {
    msg.channel.send("***" + argstring.toUpperCase().split("").join(" ") + "***")
}