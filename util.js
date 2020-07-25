const { exec } = require('child_process')

let processes = []

module.exports = {
    getCustomEmote: (cache, name) => cache.find(emoji => emoji.name == name),
    run: (command, channel) => {
        const child = exec(command, (error, stdout, stderr) => {
            channel.send(error + stderr + stdout).catch(e => console.log(e))
        })
        processes.push(child)
    },
    killall: () => processes.forEach(child => child.kill('SIGINT'))
}