const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));

const {
    multiReis,
    formatteerReis
} = require('multiplanner');

module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => "```" + formatteerReis(await multiReis(argstring)) + "```",
    help: `
    Usage: planreis (routebeschrijving)
    `
}