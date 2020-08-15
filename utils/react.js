module.exports = (msg, config) => {
    if (config.errands.configs.reactchannels.includes(msg.channel.id)) {
        msg.react("✨");
    }
}