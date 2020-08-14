const badwords = ["simp"];

module.exports = (msg, config) => {
    let naughty = false;
    let words = msg.content.split(" ");
    
    words = words.map(word => {
        if (badwords.includes(word)) {
            naughty = true;
            return "#".repeat(word.length);
        } else {
            return word;
        }
    });
    
    if (naughty) {
        msg.delete().catch((e) => {});
        msg.channel.send("`" + msg.author.username + "`: " + words.join(" "));
    }
}