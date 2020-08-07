const Discord = require("discord.js")
const fs = require("fs")
const path = process.cwd()

const { mock } = require(path + "/util.js")

let config

let reloadconfig = () => config = JSON.parse(fs.readFileSync(path + "/config.json").toString())

reloadconfig()

const client = new Discord.Client()

let commandcache = {}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
    client.user.setActivity(config.gamestatus)
})

client.on("message", async msg => {

    if (!new RegExp(`^${config.prefix}[a-z]+`).test(msg.content) || (msg.author.bot && !config.allowspam)) return

    const message = msg.content.substr(config.prefix.length)
    let firstspace = message.indexOf(" ")
    firstspace = firstspace < 0 ? message.length : firstspace
    const command = message.substr(0, firstspace)
    const argstring = message.substr(firstspace + 1)

    console.log(msg.author.tag, "   ", message)

    if (command in commandcache && config.caching) {
        commandcache[command](msg, argstring)
    } else {
        let commandfilepath = path + "/commands/" + command + ".js"
        if (!config.blocklist.includes(command) && fs.existsSync(commandfilepath)) {    // only if command is not blocked and installed
            commandcache[command] = require(commandfilepath)    // get the code
            commandcache[command](msg, argstring)   // run the code
            delete require.cache[require.resolve(commandfilepath)]  // enable live bot updates
        } else {
            switch(command) {
                case "reloadconfig":
                    reloadconfig()
                    client.user.setActivity(config.gamestatus)
                    break
                case "clearcache":
                    commandcache = {}
                    break
                default:
                    msg.channel.send("wdym " + mock(message))
                    break
            }
            
        }
    }
})

console.log("logging in")
client.login(config.token)