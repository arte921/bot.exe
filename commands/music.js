const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");

const cwd = process.cwd();

const { save, load } = require(path.join(cwd, "database", "index.js"));

const notplaying = "Nothing playing!";

const globalconfig = load("config");

const channels = {}

module.exports = async (msg, argstring, config) => {
    if (!globalconfig.caching) {    // to prevent users from being able to start music, but not control it
        msg.channel.send("This command only works if command caching is enabled.");
        return false;
    }

    if (!msg.member.voice.channel) {
        msg.channel.send("You need to join a voice channel to use the music command :)");
        return false;
    }

    const channel = msg.member.voice.channel.id;
    
    let splitargstring = argstring.split(" ");

    if (splitargstring[0] != "play" && !channels[channel]) {
        msg.channel.send(notplaying);
        return false;
    }

    switch (splitargstring[0]) {
        case "play":
            channels[channel] = {}

            if (msg.member.voice.channel) channels[channel].dcchannel = msg.member.voice.channel;
            let connection = await channels[channel].dcchannel.join();
            try{
                channels[channel].dispatcher = connection.play(
                    ytdl(
                        splitargstring[1],
                        { filter: "audioonly" }
                    )
                );
            } catch (e) {
                msg.channel.send("Please specify a youtube url 😅");
                channels[channel].dcchannel.leave();
            }
            break;
        case "pause":
            try {
                channels[channel].dispatcher.pause();
            } catch (e) {
                msg.channel.send(notplaying);
            }
            break;
        case "resume":
            try {
                channels[channel].dispatcher.resume();
            } catch (e) {
                msg.channel.send(notplaying);
            }
            break;
        case "stop":
            try {
                channels[channel].dispatcher.destroy();
            } finally {
                try {
                    channels[channel].dcchannel.leave();
                } catch(e) {}
            }
            break;
        case "volume":
            try {
                channels[channel].dispatcher.setVolume(splitargstring[1] / 100);
            } catch (e) {
                msg.channel.send(notplaying);
            }
            break;
        default:
            msg.channel.send("That's not a music command!");
            break;
    }
};
