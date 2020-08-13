module.exports = (msg, config) => {
    msg.channel.send("helo");
    if (!msg.channel.id == "737391595208442067") return;

    let time;
    if (msg.content.includes("Your server has been successfully bumped.")) {    // open bump
        time = 1000 * 60 * 60;
    } else if (msg.content.includes("Bump done")) { // disboard
        time = 1000 * 60 * 60 * 2;
    }
        
    setTimeout(() => {
        msg.reply("You can bump again!");
    }, time);
}