const path = require("path");
const { writeFile, unlink } = require("fs").promises;
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));

const messagelimit = 100;

module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        const starttime = Date.now();
        msg.react("🛠");
        let lastid = msg.id;

        let allmessages = [];

        while (true) {
            const messages = (await msg.channel.messages.fetch({
                limit: messagelimit,
                before: lastid
            })).map(message => {
                return {
                    content: message.content,
                    id: message.id
                };
            });

            lastid = messages[messages.length - 1].id;

            allmessages.push(...messages.map(message => message.content));
            
            if (messages.length < messagelimit) break;
        }

        console.log(allmessages.length);

        const file = path.join("temp", `${msg.channel.id}_chat.json`);
        await writeFile(file, JSON.stringify(allmessages));
        return `Indexed ${allmessages.length} messages in ${Math.round((Date.now() - starttime) / 1000)} seconds for usage in chat command.`
        // let failed = false;
        // await msg.channel.send({files: [file]}).catch(() => failed = true);
        // if (failed) return "File too large for Discord!";
        // await unlink(file);
    },
    help: ``
}
