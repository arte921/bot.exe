module.exports = msg => { 
    try{
        dispatcher.resume()
    } catch(e) { msg.channel.send("Nothing playing!") }
    
}