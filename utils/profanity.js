const badwords = ["simp", "lmao"];

module.exports = (msg, config) => {
    if (config.errands.configs.profanity) {
        badwords.find
        const words = msg.content.split(" ");
        msg.delete().catch((e) => {});
    }
}