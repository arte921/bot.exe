const path = require("path");
const { writeFile, unlink } = require("fs").promises;
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));

module.exports = {
    permission: permissions.sysadmin,
    code: async (msg, argstring, config) => {
        let lastid = msg.id;

        let allmessages = [];

        let done = false;
        while (!done) {
            const messages = (await msg.channel.messages.fetch({
                limit: 100,
                before: lastid
            })).map(message => {
                return {
                    content: message.content,
                    id: message.id
                };
            });

            lastid = messages[messages.length - 1].id;
            console.log(lastid, messages.length);

            allmessages.push(...messages.map(message => message.content));
            
            done = messages.length < 100;
        }

        console.log(allmessages.length);

        const file = path.join("temp", `${msg.channel.id}_chat.json`);
        await writeFile(file, JSON.stringify(allmessages));
        msg.react("👍");
        // let failed = false;
        // await msg.channel.send({files: [file]}).catch(() => failed = true);
        // if (failed) return "File too large for Discord!";
        // await unlink(file);
    },
    help: ``
}
