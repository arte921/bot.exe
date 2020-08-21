module.exports = {
    help: ``,
    permission: 0,
    code: async (msg, argstring, config) => {
        const user = msg.mentions.users.first() || msg.author;
        const url = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=4096`;
        msg.channel.send(url);
    }
}