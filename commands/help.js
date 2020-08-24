const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);
const errors = file([cwd, "utils", "errors.json"]);

module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        const starttext = `
            All commands prefixed with ${config.prefix}, without additional spaces.

            Available commands:

            `;

        if (argstring == "") {
            let commands = fs
                .readdirSync(path.join(cwd, "commands"))
                .filter(
                    (command) =>
                        !config.blocklist.some((blockedcommand) =>
                            command.includes(blockedcommand)
                        )
                )
                .join("\n")
                .replace(/.js/g, "");
                
            msg.channel.send(starttext + commands);
        } else {
            const commandpath = path.join(cwd, "commands", argstring + ".js");
            try {
                if (!fs.existsSync(commandpath)) throw("fail");
                const command = require(commandpath)
                const body = command.help;
                if (body == "") throw null;

                const permissiontexts = [
                    "Anyone can use",
                    "Trialadmin or higher",
                    "Moderator or higher",
                    "Sysadmin only"
                ];

                msg.channel.send(
                    `
                        Permission level: ${permissiontexts[command.permission]}

                        ${command.help}
                    `
                );
            } catch (e) {
                msg.channel.send(`No help page found for "${argstring}"`);
            }
        }

    },
    help: `
    Usage: \`help (command)\`.
    
    Returns a list of available command if no arguments given, Returns the help page of a specific command if an argument is given, for an existing command which is enabled in the server it's requested from.
    `
}
