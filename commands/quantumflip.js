const request = require("request");

const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);
const errors = file([cwd, "utils", "errors.json"]);

module.exports = {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        request(
            "https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8",
            (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    let info = JSON.parse(body);
                    if (info.success) {
                        msg.channel.send(info.data[0] % 2 == 0);
                    } else {
                        return errors.internal;
                    }
                } else {
                    return errors.internal;
                }
            }
        );
    },
    help: `
    "Flips a coin", but does it using the ANU Quantum Random Numbers Server api.
    
    This guarantees a fully random result, as per laws of physics. Result might be a bit slower than the normal flip command, but is more ~~overkill~~ random. 
    `
}
