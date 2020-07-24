module.exports = msg => { 
    sendLongMessage(msg.channel, args.slice(1).map(word => word + getEmoji(word, args[0])).join(" "))
    
}