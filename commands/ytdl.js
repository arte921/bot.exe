const ytdl = require("ytdl-core");

const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);

module.exports = {
    help: ``,
    permission: 0,
    code: async (msg, argstring, config) => {
        if (argstring == "") {
            msg.channel.send("Please specify a youtube url 😅");
            return;
        }

        const file = path + "/temp/" + argstring.substr(-11) + ".mp3";
        ytdl(argstring, { filter: "audioonly" }).pipe(fs.createWriteStream(file)).on("finish", async () => {
            await msg.channel.send({files: [file]}).catch((e) => {
                msg.channel.send("file too large!");
            });
            fs.unlinkSync(file);
        });
    }
}
