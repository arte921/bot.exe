module.exports = async (msg, argstring) => { 
    msg.channel.send(argstring.toLowerCase().split("").map((char, index) => {
        return (index % 2 == 0) ? char.toLowerCase() : char.toUpperCase()
    }).join(""))
    
}