module.exports = async (msg, argstring) => { 
    msg.channel.send(argstring.replace(/[prl]/g, "w"))
    
}