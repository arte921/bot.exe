module.exports = msg => { 
    processes.forEach(process => process.kill('SIGINT'))
    msg.channel.send("now thats a lotta damage")
    
default:
    msg.channel.send("wdym " + splitmsg[0].toLowerCase().split("").map((char, index) => {
        return (index % 2 == 0) ? char.toLowerCase() : char.toUpperCase()
    }).join(""))
    
}}