const fs = require("fs");
const path = require("path");

const cwd = process.cwd();

const emojis = JSON.parse(fs.readFileSync(path.join(cwd, "assets", "emoji.json")).toString());

function getEmoji(keyword, maxemoji) {
    let candidates = emojis.filter(
        (entry) => entry[1].join(" ").indexOf(keyword.toLowerCase()) >= 0
    );
    
    if (candidates.length > 0) {
        let a = "";
        for (let i = 0; i < maxemoji && i < candidates.length; i++)
            a += candidates[i][0];
        return a + " ";
    } else return " ";
}
// TODO prevent errors on incorrect input
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);

module.exports = {
    help: ``,
    permission: 0,
    code: async (msg, argstring, config) => {
        let args = argstring.split(" ");
            msg.channel.send(args
                .slice(1)
                .map((word) => word + getEmoji(word, args[0]))
                .join("")
            ).catch((e) => msg.channel.send("Message too long!"))
    }
}
