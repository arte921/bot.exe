if (config.boldchannels.includes(msg.channel.id)) {
    const botuser = msg.guild.members.cache.get(client.user.id);
    let defaultname = botuser.nickname;
    const pfp = `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png`;
    //client.user.setAvatar(pfp).catch((e) => {});
    botuser.setNickname(msg.author.username);

    msg.delete().catch((e) => {});
    msg.channel.send("**" + msg.content + "**");

    client.user.setAvatar("https://cdn.discordapp.com/icons/740022673379295252/9a8975d8f193c83ca1ab055d425da94a.png?size=128");
    msg.guild.members.cache.get(client.user.id).setNickname(defaultname);
}