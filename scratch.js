833aa26ac2167301c1693f4ef75a3c69d8a2e7003f2a7fab4dd8bd15ca87b76chelo94efc0176b3c1bcd9ffac92f70a88eb9350c5f903c381842625518109ecb366d 
    let fun = require(path + "/commands/helo.js")
    fun(msg)

833aa26ac2167301c1693f4ef75a3c69d8a2e7003f2a7fab4dd8bd15ca87b76cping94efc0176b3c1bcd9ffac92f70a88eb9350c5f903c381842625518109ecb366d 
    msg.channel.send("helo " + msg.author.username)
    
833aa26ac2167301c1693f4ef75a3c69d8a2e7003f2a7fab4dd8bd15ca87b76chelp94efc0176b3c1bcd9ffac92f70a88eb9350c5f903c381842625518109ecb366d 
    msg.channel.send("RTFM")
    msg.channel.send("ssh-rtfm")
    
833aa26ac2167301c1693f4ef75a3c69d8a2e7003f2a7fab4dd8bd15ca87b76crtfm94efc0176b3c1bcd9ffac92f70a88eb9350c5f903c381842625518109ecb366d 
    msg.channel.send(copypasta.helptext)
    
833aa26ac2167301c1693f4ef75a3c69d8a2e7003f2a7fab4dd8bd15ca87b76csay94efc0176b3c1bcd9ffac92f70a88eb9350c5f903c381842625518109ecb366d 
    msg.channel.send(argstring == 94efc0176b3c1bcd9ffac92f70a88eb9350c5f903c381842625518109ecb366d )" ? "(:" : argstring)
    
833aa26ac2167301c1693f4ef75a3c69d8a2e7003f2a7fab4dd8bd15ca87b76cscream94efc0176b3c1bcd9ffac92f70a88eb9350c5f903c381842625518109ecb366d 
    sendLongMessage(msg.channel, argstring.toUpperCase().split("").join(" "), "***")
    
833aa26ac2167301c1693f4ef75a3c69d8a2e7003f2a7fab4dd8bd15ca87b76cwhisper94efc0176b3c1bcd9ffac92f70a88eb9350c5f903c381842625518109ecb366d 
    msg.channel.send(argstring.split("").map(char => {
        if (/([a-zA-Z])/.test(char)) return smallLetters[char.toLowerCase().charCodeAt(0) - 97]
        else if (/([0-9])/.test(char)) return smallNumbers[char]
        else return char
    }).join(""))
    
833aa26ac2167301c1693f4ef75a3c69d8a2e7003f2a7fab4dd8bd15ca87b76cmock94efc0176b3c1bcd9ffac92f70a88eb9350c5f903c381842625518109ecb366d 
    msg.channel.send(argstring.toLowerCase().split("").map((char, index) => {
        return (index % 2 == 0) ? char.toLowerCase() : char.toUpperCase()
    }).join(""))
    
833aa26ac2167301c1693f4ef75a3c69d8a2e7003f2a7fab4dd8bd15ca87b76cuwu94efc0176b3c1bcd9ffac92f70a88eb9350c5f903c381842625518109ecb366d 
    msg.channel.send(argstring.replace(/[prl]/g, "w"))
    
833aa26ac2167301c1693f4ef75a3c69d8a2e7003f2a7fab4dd8bd15ca87b76cuptime94efc0176b3c1bcd9ffac92f70a88eb9350c5f903c381842625518109ecb366d 
    let diff = new Date() - startdate
    let seconds = Math.floor(diff / 1000)
    let mins = Math.floor(seconds / 60)
    let hours = Math.floor(mins / 60)
    let days = Math.floor(hours / 24)
    msg.channel.send(`${days} days, ${hours % 24} hours, ${mins % 60} minutes, ${seconds % 60} seconds`)
    
833aa26ac2167301c1693f4ef75a3c69d8a2e7003f2a7fab4dd8bd15ca87b76cplay94efc0176b3c1bcd9ffac92f70a88eb9350c5f903c381842625518109ecb366d 
    if (lastseenchannel == null && !msg.member.voice.channel) {
        msg.channel.send("join a channel yourself blyat")
        return
    }
    if (msg.member.voice.channel) lastseenchannel = msg.member.voice.channel
    connection = await lastseenchannel.join()
    dispatcher = connection.play(ytdl(argstring.indexOf("youtube") < 0 ? "https://www.youtube.com/watch?v=U06jlgpMtQs" : argstring, { filter: "audioonly" }))
    
833aa26ac2167301c1693f4ef75a3c69d8a2e7003f2a7fab4dd8bd15ca87b76cpause94efc0176b3c1bcd9ffac92f70a88eb9350c5f903c381842625518109ecb366d 
    try{
        dispatcher.pause()
    } catch(e) { msg.channel.send("Nothing playing!") }
    
833aa26ac2167301c1693f4ef75a3c69d8a2e7003f2a7fab4dd8bd15ca87b76cresume94efc0176b3c1bcd9ffac92f70a88eb9350c5f903c381842625518109ecb366d 
    try{
        dispatcher.resume()
    } catch(e) { msg.channel.send("Nothing playing!") }
    
833aa26ac2167301c1693f4ef75a3c69d8a2e7003f2a7fab4dd8bd15ca87b76cstop94efc0176b3c1bcd9ffac92f70a88eb9350c5f903c381842625518109ecb366d 
    try{
        dispatcher.destroy()
        msg.channel.send("aight, imma head out")
        await lastseenchannel.leave()
    } catch(e) { msg.channel.send("Nothing playing!") }
    
833aa26ac2167301c1693f4ef75a3c69d8a2e7003f2a7fab4dd8bd15ca87b76cvolume94efc0176b3c1bcd9ffac92f70a88eb9350c5f903c381842625518109ecb366d 
    try{
        dispatcher.setVolume(argstring / 100)
    } catch(e) { msg.channel.send("Nothing playing!") }
    
833aa26ac2167301c1693f4ef75a3c69d8a2e7003f2a7fab4dd8bd15ca87b76cemoji94efc0176b3c1bcd9ffac92f70a88eb9350c5f903c381842625518109ecb366d 
    sendLongMessage(msg.channel, args.slice(1).map(word => word + getEmoji(word, args[0])).join(" "))
    
833aa26ac2167301c1693f4ef75a3c69d8a2e7003f2a7fab4dd8bd15ca87b76cssh94efc0176b3c1bcd9ffac92f70a88eb9350c5f903c381842625518109ecb366d 
    if (msg.author.id == "488724416579108865" || msg.author.id == "480024733535174668") {
        const child = exec(argstring, (error, stdout, stderr) => {
            msg.channel.send(error + stderr + stdout).catch(e => console.log(e))
        })
        processes.push(child)
    } else msg.channel.send("kek no " + getCustomEmote(msg.guild.emojis.cache, "nightmare"))
    
833aa26ac2167301c1693f4ef75a3c69d8a2e7003f2a7fab4dd8bd15ca87b76cdoom94efc0176b3c1bcd9ffac92f70a88eb9350c5f903c381842625518109ecb366d 
    let discordmsg = await msg.channel.send("starting...")
    setInterval(() => {
        
        discordmsg.edit(".\n" + calc(scene, camera)).catch(console.log(calc(scene, camera)))

        
        camera = [
            add(camera[0], [7.5, 5, 0],  mspf / 10000),
            add(camera[1], [0, 1], rad(100) * mspf / 10000)
        ]

    }, mspf)                     

    
833aa26ac2167301c1693f4ef75a3c69d8a2e7003f2a7fab4dd8bd15ca87b76ckillall94efc0176b3c1bcd9ffac92f70a88eb9350c5f903c381842625518109ecb366d 
    processes.forEach(process => process.kill('SIGINT'))
    msg.channel.send("now thats a lotta damage")
    
default:
    msg.channel.send("wdym " + splitmsg[0].toLowerCase().split("").map((char, index) => {
        return (index % 2 == 0) ? char.toLowerCase() : char.toUpperCase()
    }).join(""))
    
}