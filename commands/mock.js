const { mock } = require("../util.js");

module.exports = async (msg, argstring, config) => {
    msg.channel.send(
        argstring
            .split("")
            .map((char, index) => {
                return index % 2 == 0 ? char.toLowerCase() : char.toUpperCase();
            })
            .join("")
    );
};
