module.exports = msg => { 
    try{
        dispatcher.setVolume(argstring / 100)
    } catch(e) { msg.channel.send("Nothing playing!") }
    
}