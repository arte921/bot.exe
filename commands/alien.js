module.exports = async (msg, argstring, config) => {
    const addition = argstring == "" ? "" : "**: " + argstring + "**";
    msg.channel.send("✨👄👀" + addition);
};
