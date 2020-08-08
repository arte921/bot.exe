const ytdl = require("ytdl-core");
const fs = require("fs");

const globalconfig = JSON.parse(fs.readFileSync("./config.json").toString());

let dispatcher, lastseenchannel;

module.exports = async (msg, argstring, config) => {
    if (!globalconfig.caching) {    // to prevent users from being able to start music, but not control it
        msg.channel.send("This command only works if command caching is enabled.")
        return
    }
    
    let splitargstring = argstring.split(" ");
    switch (splitargstring[0]) {
        case "play":
            if (!lastseenchannel && !msg.member.voice.channel) {
                msg.channel.send("You need to join a voice channel to start the music command :)");
                return;
            }
            if (msg.member.voice.channel)
                lastseenchannel = msg.member.voice.channel;
            let connection = await lastseenchannel.join();
            dispatcher = connection.play(
                ytdl(
                    argstring.indexOf("youtube") < 0
                        ? "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        : argstring,
                    { filter: "audioonly" }
                )
            );
            break;
        case "pause":
            try {
                dispatcher.pause();
            } catch (e) {
                msg.channel.send("Nothing playing!");
            }
            break;
        case "resume":
            try {
                dispatcher.resume();
            } catch (e) {
                msg.channel.send("Nothing playing!");
            }
            break;
        case "stop":
            try {
                dispatcher.destroy();
            } finally {
                lastseenchannel.leave();
            }
            break;
        case "volume":
            try {
                dispatcher.setVolume(splitargstring[1] / 100);
            } catch (e) {
                msg.channel.send("Nothing playing!");
            }
            break;
        default:
            msg.channel.send("I didn't quite catch that.");
            break;
    }
};
