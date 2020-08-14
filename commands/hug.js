const righthugs = ["⊂(・﹏・⊂)","ლ(・ヮ・ლ)","⊂(・ヮ・⊂)", "⊂(・▽・⊂)", "ლ(・﹏・ლ)", "⊂(･ω･*⊂)", "ლ(･ω･*ლ)","ლ(´ ❥ `ლ)", "⊂(´・ω・｀⊂)"];
const lefthugs = ["(つ◉益◉)つ", "(っಠ‿ಠ)っ", "ʕっ•ᴥ•ʔっ", "（っ・∀・）っ", "(っ⇀⑃↼)っ", "(つ´∀｀)つ", "(つ▀¯▀)つ", "(っ´▽｀)っ", "(づ￣ ³￣)づ", "(.づ◡﹏◡)づ.", "(っ*´∀｀*)っ", "(っ⇀`皿′↼)っ", "(.づσ▿σ)づ."];
const midhugs = ["⊂（♡⌂♡）⊃", "⊂(◉‿◉)つ", "＼(^o^)／", "d=(´▽｀)=b", "⊂( ◜◒◝ )⊃", "⊂((・▽・))⊃"];

const getrandom = (array) => array[Math.floor(Math.random() * array.length)];

module.exports = async (msg, argstring, config) => {
    const reciever = msg.mentions.users.first();
    if (reciever) {
        let starthug = getrandom(lefthugs);
        msg.channel.send(`**${msg.author.username}: ${starthug} ${argstring} ?**`).then(botmsg => {
            botmsg.react("✅");
            botmsg.awaitReactions(
                (reaction, reacter) => reacter.id == reciever.id,//reaction.emoji.name == "✅" && 
                { max: 1, time: 60000, errors: ['time'] }
            ).then(collected => {
                botmsg.edit(`**${msg.author.username} ${starthug} ${getrandom(righthugs)} ${reciever.username}**`);
            }).catch((e) => {});
        });
    } else {
        msg.channel.send(getrandom(midhugs));
    }
};