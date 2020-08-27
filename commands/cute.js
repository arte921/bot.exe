const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));


const cuteness = JSON.parse(fs.readFileSync(path.join(cwd, "assets", "cuteness.json")));

module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => cuteness[Math.floor(Math.random() * cuteness.length)],
    help: `Returns a random cute image.`
}