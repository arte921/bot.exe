
module.exports = async (msg, argstring, config) => {
    if (!msg.member.permissions.has("BAN_MEMBERS")) return;

    if (isNaN(argstring) || argstring == "") {
        msg.channel.send("Please provide an amount of messages to delete!");
        return;
    }
    
    msg.channel.bulkDelete(argstring);
};
