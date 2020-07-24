module.exports = msg => { 
    if (lastseenchannel == null && !msg.member.voice.channel) {
        msg.channel.send("join a channel yourself blyat")
        return
    }
    if (msg.member.voice.channel) lastseenchannel = msg.member.voice.channel
    connection = await lastseenchannel.join()
    dispatcher = connection.play(ytdl(argstring.indexOf("youtube") < 0 ? "https://www.youtube.com/watch?v=U06jlgpMtQs" : argstring, { filter: "audioonly" }))
    
}