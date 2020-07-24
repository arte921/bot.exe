module.exports = msg => { 
    msg.channel.send(argstring.split("").map(char => {
        if (/([a-zA-Z])/.test(char)) return smallLetters[char.toLowerCase().charCodeAt(0) - 97]
        else if (/([0-9])/.test(char)) return smallNumbers[char]
        else return char
    }).join(""))
    
}