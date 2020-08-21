module.exports = {
    help: ``,
    permission: 0,
    code: async (msg, argstring, config) => {
        msg.delete().catch((e) => {});    
        const addition = argstring == "" ? "" : "**: " + argstring + "**";
        msg.channel.send("✨👄👀" + addition);
    }
}
