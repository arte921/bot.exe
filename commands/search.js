const start = "http://letmegooglethat.com/?q=";

module.exports = async (msg, argstring, config) => {
    msg.channel.send(
        start +
        argstring.replace(/ /g, "+")
    );
};