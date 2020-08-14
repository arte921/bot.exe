module.exports = async (msg, argstring, config) => {
    msg.delete().catch((e) => {});    
    const addition = argstring == "" ? "" : "**: " + argstring + "**";
    msg.channel.send("✨👄👀" + addition);
};
