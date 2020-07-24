let message = msg.content.substr(prefix.length)
let args = splitmsg.slice(1)
let splitmsg = message.split(" ")
let argstring = message.substr(message.indexOf(" ") + 1)