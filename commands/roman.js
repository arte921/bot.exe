const decimal = 17;

const definitions = [
    {
        value:1,
        letter:"𝕀"
    },
    {
        value:5,
        letter:"𝕍"
    },
    {
        value:10,
        letter:"𝕏"
    },
    {
        value:50,
        letter:"𝕃"
    },
    {
        value:100,
        letter:"ℂ"
    },
    {
        value:500,
        letter:"𝔻"
    },
    {
        value:1000,
        letter:"𝕄"
    }
].reverse();


const path = require("path");
const { isString } = require("util");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const isint = require(path.join(cwd, "utils", "isint.js"));
const permissions = file([cwd, "utils", "permissions.json"]);
const errors = file([cwd, "utils", "errors.json"]);

module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        

        if (!isint(argstring)) {
            msg.channel.send("Please provide a positive integer to convert to romans!");
            return;
        }

        let leftover = argstring;
        let result = "";
        definitions.forEach(candidate => {
            while (candidate.value <= leftover) {
                result += candidate.letter;
                leftover -= candidate.value;
            }
        });
        
        msg.channel.send(result);
    },
    help: ``
}
