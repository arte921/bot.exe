const fs = require("fs");
const ytdl = require("ytdl-core");
const path = process.cwd();

module.exports = (msg, argstring, config) => {

    const file = path + "/temp/" + argstring.substr(-11) + ".mp3";
    ytdl(argstring, { filter: "audioonly" }).pipe(fs.createWriteStream(file)).on("finish", async () => {
        await msg.channel.send({files: [file]}).catch((e) => {
            msg.channel.send("file too large!");
        });
        fs.unlinkSync(file);
    });
};
