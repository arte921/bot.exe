module.exports = (msg, argstring) => {
    msg.channel.send("***" + argstring.toUpperCase().split("").join(" ") + "***")
}