const { mock } = require("./util.js");

module.exports = async (msg, argstring, config) => {
    msg.channel.send(mock(argstring));
};
