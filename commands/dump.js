const path = require("path");
const { writeFile, unlink } = require("fs").promises;
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));


module.exports = {
    permission: permissions.sysadmin,
    code: async (msg, argstring, config) => {
        const messages = await msg.channel.messages.fetch();
        const file = path.join("temp", `${msg.channel.id}_${Date.now()}.json`);
        await writeFile(file, JSON.stringify(messages));
        await msg.channel.send({files: [file]}).catch((e) => {
            return "File too large for Discord!";
        });
        await unlink(file);
        await save("dump", messages);
    },
    help: ``
}
