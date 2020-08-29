const badwords = [ "simp", "heck", "no" ];

module.exports = (msg, config) => {
    let naughty = false;

    let finalmessage = msg.content;

    for (const badword of badwords) {
        if (msg.content.includes(badword)) {
            naughty = true;
            finalmessage = finalmessage.replace(new RegExp(badword, "ig"), "nya");
        };
    };
    
    if (naughty) {
        msg.delete().catch(() => {});
        msg.channel.send("`" + msg.author.username + "`: " + finalmessage);
    }
}