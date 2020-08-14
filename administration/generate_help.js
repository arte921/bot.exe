const helpobject = {
alien:`
Usage: alien (message)

Summons a cute alien, which can optionally say a message.
`, anywhere: `

`, ask: `

`, ban:`
Usage: \`ban [mention of user to ban]\`.

Requires banning privilege for both the bot and whoever issues the command.
`, bruh: `

`, cat:`
Returns a random cat image.
`, curse:`
Usage: \`curse [text to curse]\`.

Returns all text behind the command, but stylized ̷͗͘L̷̓͐I̸͗͝K̵̓̓E̴̾̔ ̴̆͠T̶̛̾H̷̋̈́I̸͗͝Ś̷͐.
`, dmme:`
Usage: \`dmme (text to send\`)

Will send a dm (private message) to the user who issued the command.
The message will contain the given text, or alternatively a placeholder text.
`, emoji:`
Usage: \`emoji [maximum amount of emoji per word] [text to put emojis in]\`.

Note that too long messages with too much emojis will not be returned, as per discord character limit.
`, emote:`
Usage: \`emote [discord server custom emote]\`.

This will not work with unicode or default discord emotes.
`, fancy:`
Usage: \`fancy [text to stylize]\`.

Returns the text but stylized 𝕃𝕀𝕂𝔼 𝕋ℍ𝕀𝕊.
`, flip:`
"Flips a coin".

Has a 50% chance of returning \`true\`, returns \`false\` otherwise.
`, help:`
Usage: \`help (command)\`.

Returns a list of available command if no arguments given, Returns the help page of a specific command if an argument is given, for an existing command which is enabled in the server it's requested from.
`, here: `
Allows the bot in the channel the command is ran from for all users.
`, hug: `

`, kick:`
Usage: \`kick [metion of user to kick]\`.

Requires kicking privilege for both the bot and whoever issues the command.
`, mock:`
Usage: \`mock [text to mock]\`.

Returns the given text stylized lIkE ThIs
`, music:`
Usage: \`music [command]\`.

Available music commands:
    play [youtube url or video id]
        Plays the track from youtube to the voice channel the user is in.
    
    pause
        Pauses the track playing in the voice channel the user is in.
    
    resume
        Resumes the track paused in the voice channel the user is in.
    
    volume [percentage]
        Sets the volume from a percentage. Raising the percentage above 100 is possible, but will decrease sound quality.
    
    stop
        Stops playback and lets the bot leave the channel it's currently in
    
Requires command caching to be enabled by the bot sysadmin due to technical reasons.
`, nowhere: `

`, pfp:`
Usage: \`pfp (mention)\`

Returns a full res version of the mentioned user's profile picture, or the message author if none is given.
`, ping:`
Returns a text plus the name of who sent the text.
`, quantumflip:`
"Flips a coin", but does it using the ANU Quantum Random Numbers Server api.

This guarantees a fully random result, as per laws of physics. Result might be a bit slower than the normal flip command, but is more ~~overkill~~ random. 
`, remindme:`
Usage: \`remindme [time] (note)\`.

Pings you with an optional note you give after the specified amount of *minutes*.
`, say:`
Usage: \`say [text]\`.

Simply repeats you by sending the given text.
`, scream:`
Usage: \`scream [text]\`.

Returns the given text but stylized ***L I K E   T H I S***.
`, search:`
Usage: \`search [search query]\`.

Helps you search for the query.
`, update:`
Sysadmin only.

Updates the bot from github to the latest version. Clearing the command cache using the clearcache command might be neccesary.
`, uptime:`
Returns the uptime of the bot.
`, uwu:`
Usage: \`uwu [text]\`.

Returns the given text but stylized wike this.
`, water: `
Obtains ***W A T E R***
`, whisper:`
Usage: \`whisper [text]\`.

Returns the given text but stylized ˡⁱᵏᵉ ᵗʰⁱˢ.
`, ytdl:`
Usage: \`ytdl [youtube url/video id]\`.

Returns an mp3 file with the audio of the given youtube video. Will not work on longer tracks thanks do the discord 8mb file size limit.
`
};

const fs = require("fs");
const path = require("path");

const cwd = process.cwd();

fs.writeFileSync(path.join(cwd, "help.json"), JSON.stringify(helpobject));