const fs = require("fs");
const ytdl = require("ytdl-core");

module.exports = (msg, argstring, config) => {
    const file = "./temp/" + argstring.substr(-11);
    ytdl(argstring).pipe(fs.createWriteStream(file));
    const attachment = new MessageAttachment(file);
    msg.channel.send(attachment);
};
