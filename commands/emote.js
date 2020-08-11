module.exports = async (msg, argstring, config) => {
    let match = argstring.match(/<[:a-zA-Z:0-9]+>/);
    if (match) {
        const emote = match[0];
        const id = emote.split(":")[2].slice(0, -1);
        const url = `https://cdn.discordapp.com/emojis/${id}.png`;
        msg.channel.send(url);
    } else {
        msg.channel.send("Please provide a custom server emote!");
    }
}