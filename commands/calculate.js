const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));
const math = require("mathjs");


module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        try{
            return math.evaluate(argstring).toString();
        } catch (e) {
            return "no";
        }
    },
    help: ``
}