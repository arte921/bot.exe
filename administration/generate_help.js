const helpobject = {
alien:, anywhere: `

`, ask: `

`, ban:, bruh: `

`, cat:, curse:, dmme:, emoji:, emote:, fancy:, flip:, help:, here: , hug: `

`, kick, mock:, music:, nowhere: `

`, pfp:, ping:, quantumflip:, remindme:, say, scream:, search:, update:, uptime:, uwu:, water: , whisper:, ytdl:
};

const fs = require("fs");
const path = require("path");

const cwd = process.cwd();

fs.writeFileSync(path.join(cwd, "help.json"), JSON.stringify(helpobject));