module.exports = msg => { 
    if (msg.author.id == "488724416579108865" || msg.author.id == "480024733535174668") {
        const child = exec(argstring, (error, stdout, stderr) => {
            msg.channel.send(error + stderr + stdout).catch(e => console.log(e))
        })
        processes.push(child)
    } else msg.channel.send("kek no " + getCustomEmote(msg.guild.emojis.cache, "nightmare"))
    
}