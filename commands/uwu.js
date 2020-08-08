module.exports = async (msg, argstring, config) => {
    msg.channel.send(argstring.replace(/[prl]/g, "w"));
};
