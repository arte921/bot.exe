Template for config.json:

{
    "token":"discord api bot token here",
    "prefix":"bot will only interpret commands preceded with this",
    "sshusers":[
        "discord user id's of",
        "people who have permissions to run native commands",
        "use with care"
    ],
    "allowspam":true,
    "caching":false,
    "enablemusic":false
}

allowspam: wether the bot will respond to other bots
caching: wether the bot will cache commands in ram, improves performance but disabling will enable live reloading of commands, helpful when debugging
enablemusic: enable/disable music command, useful when ffmpeg not supported on host/low resource server