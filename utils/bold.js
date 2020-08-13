let longest = 0; // no work yet because no good caching

module.exports = (msg, config) => {
    if (config.errands.configs.boldchannels.includes(msg.channel.id)) {
        msg.delete().catch((e) => {});
        if (msg.author.username.length > longest) longest = msg.author.username.length;

        const spaces = longest - msg.author.username.length;
        msg.channel.send("`" + msg.author.username + "`: " + " ".repeat(spaces) + "**" + msg.content + "**");
    }
}