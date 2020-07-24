module.exports = msg => { 
    try{
        dispatcher.destroy()
        msg.channel.send("aight, imma head out")
        await lastseenchannel.leave()
    } catch(e) { msg.channel.send("Nothing playing!") }
    
}