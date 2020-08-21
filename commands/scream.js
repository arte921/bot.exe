module.exports = {
    help: ``,
    permission: 0,
    code: async (msg, argstring, config) => {
        msg.channel.send(
            "***" + argstring.toUpperCase().split("").join(" ") + "***"
        ).catch(e => msg.channel.send("Your message is too big!"));
    }
}
