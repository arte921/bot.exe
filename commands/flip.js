module.exports = async (msg, argstring, config) => {
    msg.channel.send(Math.random() < 0.5);
};
