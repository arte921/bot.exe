let processes = []

module.exports = {
    getCustomEmote: (cache, name) => cache.find(emoji => emoji.name == name),
    saveProcess: child => processes.push(child),
    killall: () => processes.forEach(child => child.kill('SIGINT'))
}