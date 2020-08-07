const Discord = require("discord.js")
const fs = require("fs")
const path = process.cwd()

const { mock } = require("./util.js")

let globalconfig

let reloadconfig = () => globalconfig = JSON.parse(fs.readFileSync("./config.json").toString())

reloadconfig()

const client = new Discord.Client()

let commandcache = {}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
    
    client.user.setActivity(globalconfig.gamestatus)

    client.guilds.cache.forEach(guild => {
        
        //for (channel in ) console.log(channel.guild)
        if (!globalconfig[guild.id]) {
            globalconfig[guild.id] = globalconfig.default_config
            globalconfig[guild.id].allowed_channels = guild
                .channels
                .cache
                .filter(channel => channel.type == 'text')
                .map(channel => channel.id)
        }
        
    })

    fs.writeFileSync(
        "./backup.json",
        fs.readFileSync("./database.json")
    )

    fs.writeFileSync(
        "./database.json",
        JSON.stringify(globalconfig)
    )
})

client.on("message", async msg => {
    const config = globalconfig[msg.guild.id]

    if (
        !new RegExp(`^${config.prefix}[a-z]+`).test(msg.content) || // starts with prefix
        (msg.author.bot && !config.allowspam)// ||    // is not a bot if it's not allowed to respond to bots
        //!(msg.guild.id == "732565638089801768" && msg.channel.id != "737391595208442067")   // restrict to bot channel on programming island. hardcoded for now, in config.json soon™
    ) return

    const message = msg.content.substr(config.prefix.length)
    let firstspace = message.indexOf(" ")
    firstspace = firstspace < 0 ? message.length : firstspace
    const command = message.substr(0, firstspace)
    const argstring = message.substr(firstspace + 1)

    console.log(msg.author.tag, "   ", message)

    if (command in commandcache && globalconfig.caching) {
        commandcache[command](msg, argstring)
    } else {
        let commandfilepath = "./commands/" + command + ".js"
        if (!config.blocklist.includes(command) && fs.existsSync(commandfilepath)) {    // only if command is not blocked and installed
            commandcache[command] = require(commandfilepath)    // get the code
            commandcache[command](msg, argstring, config)   // run the code
            delete require.cache[require.resolve(commandfilepath)]  // enable live bot updates
        } else if (globalconfig.sysadmins.includes(msg.author.id)) {
            switch(command) {
                case "reloadconfig":
                    reloadconfig()
                    client.user.setActivity(globalconfig.gamestatus)
                    break
                case "clearcache":
                    commandcache = {}
                    break
                default:
                    msg.channel.send("TYPO! :D")
                    break
            }
        } else {
            msg.channel.send("wdym " + mock(message))
        }
    }
})

console.log("logging in")
client.login(globalconfig.token)