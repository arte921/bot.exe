const request = require("request");

const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const permissions = file([cwd, "utils", "permissions.json"]);

module.exports = {
    help: ``,
    permission: 0,
    code: async (msg, argstring, config) => {
        request(
            "https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8",
            (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    let info = JSON.parse(body);
                    if (info.success) {
                        msg.channel.send(info.data[0] % 2 == 0);
                    } else {
                        msg.channel.send(
                            "Quantum randomness api returned an error. Please use the peasant normal javacsript Math.random() based `flip` command."
                        );
                    }
                } else {
                    msg.channel.send(
                        "Connection to quantum randomness api failed. Please use the peasant normal javacsript Math.random() based `flip` command."
                    );
                }
            }
        );
    }
}
