module.exports = msg => { 
    try{
        dispatcher.pause()
    } catch(e) { msg.channel.send("Nothing playing!") }
    
}