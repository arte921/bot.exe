const ytdl = require("ytdl-core");
const fs = require("fs");

const globalconfig = JSON.parse(fs.readFileSync("./config.json").toString());

let channels = {}

module.exports = async (msg, argstring, config) => {
    if (!globalconfig.caching) {    // to prevent users from being able to start music, but not control it
        msg.channel.send("This command only works if command caching is enabled.")
        return
    }

    if (!msg.member.voice.channel) {
        msg.channel.send("You need to join a voice channel to use the music command :)");
        return;
    }

    const channel = msg.member.voice.channel.id;
    
    let splitargstring = argstring.split(" ");
    switch (splitargstring[0]) {
        case "play":
            if (!splitargstring[1] || !splitargstring[1].includes("youtube")) { // don't invert the order of booleans
                msg.channel.send("Please specify a youtube url 😅");
            }

            channels[channel] = {}

            if (msg.member.voice.channel) channels[channel].dcchannel = msg.member.voice.channel;
            let connection = await channels[channel].dcchannel.join();
            channels[channel].dispatcher = connection.play(
                ytdl(
                    splitargstring[1],
                    { filter: "audioonly" }
                )
            );
            break;
        case "pause":
            try {
                channels[channel].dispatcher.pause();
            } catch (e) {
                msg.channel.send("Nothing playing!");
            }
            break;
        case "resume":
            try {
                channels[channel].dispatcher.resume();
            } catch (e) {
                msg.channel.send("Nothing playing!");
            }
            break;
        case "stop":
            try {
                channels[channel].dispatcher.destroy();
            } finally {
                channels[channel].dcchannel.leave();
            }
            break;
        case "volume":
            try {
                channels[channel].dispatcher.setVolume(splitargstring[1] / 100);
            } catch (e) {
                msg.channel.send("Nothing playing!");
            }
            break;
        default:
            msg.channel.send("That's not a music command!");
            break;
    }
};
