module.exports = (msg, config) => {
    if (config.errands.configs.boldchannels.includes(msg.channel.id)) {
        msg.delete().catch((e) => {});
        msg.channel.send("`" + msg.author.username + "`: " + "**" + msg.content + "**");
    }
}