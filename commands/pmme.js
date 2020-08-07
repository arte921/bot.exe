module.exports = async (msg, argstring) => {
    const message = argstring != "" ? argstring : "Hello :D"
    msg.author.send(message).catch((e) => {})
}