module.exports = {
    help: ``,
    permission: 0,
    code: async (msg, argstring, config) => {
        msg.channel.send(argstring.replace(/[prl]/g, "w"));
    }
}
