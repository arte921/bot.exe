module.exports = {
    getCustomEmote: (cache, name) => cache.find(emoji => emoji.name == name),
    sendLongMessage: (channel, message, markup = "") => {
        let chunksize = 1500
        let lastindex = 0
        let i = 0
        while (i <= message.length) {
            i+= chunksize
            channel.send(markup + message.slice(lastindex, i) + markup)
            lastindex = i

        }
    },
    mock: text => text.split("").map((char, index) => {
            return (index % 2 == 0) ? char.toLowerCase() : char.toUpperCase()
        }).join("")    
}