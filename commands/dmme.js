module.exports = async (msg, argstring, config) => {
    const message = argstring != "" ? argstring : "Hello :D";
    msg.author.send(message).catch((e) => {});
};
