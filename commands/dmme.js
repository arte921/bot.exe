module.exports = {
    help: ``,
    permission: 0,
    code: async (msg, argstring, config) => {
        const message = argstring != "" ? argstring : "Hello :D";
        msg.author.send(message).catch((e) => {});
    }
}
