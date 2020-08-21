const start = "http://letmegooglethat.com/?q=";

module.exports = {
    help: ``,
    permission: 0,
    code: async (msg, argstring, config) => {
        msg.channel.send(
            start +
            argstring.replace(/ /g, "+")
        );
    }
}