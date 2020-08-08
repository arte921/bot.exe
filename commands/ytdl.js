const fs = require("fs");
const ytdl = require("ytdl-core");
const path = process.cwd();

module.exports = (msg, argstring, config) => {
    const file = path + "/temp/" + argstring.substr(-11);
    ytdl(argstring).pipe(fs.createWriteStream(file));
    const attachment = new MessageAttachment(file);
    msg.channel.send(attachment);
};
