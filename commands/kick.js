const fs = require("fs")
const path = process.cwd()
const config = JSON.parse(fs.readFileSync(path + "/config.json").toString())

module.exports = async (msg, argstring) => {
    if (!config.admins.includes(msg.author.id)) return
    
    let args = argstring.split(" ")
    if (!args[0]) return msg.channel.send("Who's the lucky one?")
    const user = msg.mentions.users.first()
    if (user) {
        const member = msg.guild.member(user)
        if (member) {
            member.kick("Y E E T").catch((e) => {})
            user.send("cya! :D").catch((e) => {})
            msg.channel.send(`yeeted ${user.tag}`)
        }
    }
}