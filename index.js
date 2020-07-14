const fs = require('fs')
const path = process.cwd()


const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!')
  }
})


const token = fs.readFileSync(path + "/token.txt").toString()
client.login(token)