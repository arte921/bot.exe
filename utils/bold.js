module.exports = (msg, config) => {
    if (config.boldchannels.includes(msg.channel.id)) {    
        msg.delete().catch((e) => {});
        msg.channel.send("**" + msg.content + "**");
    }
}