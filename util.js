module.exports = {
    getCustomEmote: (cache, name) => cache.find(emoji => emoji.name == name)
}