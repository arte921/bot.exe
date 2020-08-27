const letters = ["ɐ", "q", "ɔ", "p", "ǝ", "ɟ", "ƃ", "ɥ", "ᴉ", "ɾ", "ʞ", "l", "ɯ", "u", "o", "d", "b", "ɹ", "s", "ʇ", "n", "ʌ", "ʍ", "x", "ʎ", "z"];

const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));


module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        return argstring
            .split("")
            .reverse()
            .map((char) => {
                if (/([a-zA-Z])/.test(char)) {
                    return letters[
                        char.toLowerCase().charCodeAt(0) - 97
                    ];
                } else return char;
            })
        .join("");
    },
    help: `
    Returns the given text but stylized sᴉɥʇ ǝʞᴉl.
    `
}