const fs = require("fs")
const path = process.cwd()
const config = JSON.parse(fs.readFileSync(path + "/config.json").toString())

module.exports = async (msg, argstring) => {
    if (!config.admins.includes(msg.author.id)) return

    let args = argstring.split(" ")
    if (!args[0]) return msg.channel.send("Who has been naughty?")
    const user = msg.mentions.users.first()
    if (user) {
        const member = msg.guild.member(user)
        if (member) {
            member.ban("bruh").catch((e) => {})
            user.send("BYEEE! :D").catch((e) => {})
            msg.channel.send(`${user.tag} is gone 🦀`)
        }
    }
}