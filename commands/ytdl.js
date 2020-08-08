const fs = require("fs");
const ytdl = require("ytdl-core");

module.exports = (msg, argstring, config) => {
    const file = "./temp/" + argstring.substr(-11);
    ytdl(argstring).pipe(fs.createWriteStream(file));
    msg.channel.send({files: [file]});
};
