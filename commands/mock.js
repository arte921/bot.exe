module.exports = async (msg, argstring, config) => {
    msg.channel.send(
        argstring
            .split("")
            .map((char, index) => index % 2 == 0 ? char.toLowerCase() : char.toUpperCase())
            .join("")
    );
};
