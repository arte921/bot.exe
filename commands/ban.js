module.exports = async (msg, argstring, config) => {
    if (!msg.member.permissions.has("BAN_MEMBERS")) return;

    let args = argstring.split(" ");
    if (!args[0]) return msg.channel.send("Please mention the lucky one.");
    const user = msg.mentions.users.first();
    if (user) {
        const member = msg.guild.member(user);
        if (member) {
            member.ban(msg.author.tag).catch((e) => {
                msg.channel.send("This bot doesn't have banning privileges!");
            });
        }
    }
};
