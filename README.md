# bot.exe

This bot is made with the goal of being fun to use, and being easy to administrate and hack on.
It has a simple plugin system, which can add, remove and update plugins (every plugin is a command) without restarting the bot.
It can also reload the configuration from disk without restarting.

If you don't need those live functions, you can enable a caching system which improves performance. You can still reload the commands live, by running the bot's `clearcache` command.

# usage

You setup the bot by creating and editing a file called `config.json`. It's recommended to copy over `config.json.example` to `config.json` and edit it to your liking.  Make a good default config, add sysadmins (id's of discord users who can eg. update the bot, live reload the database and config or clear the cache) and add in your api key. You can get an api key for free at the [Discord developer portal](https://discord.com/developers).

You can also just add it to your server using [this link](https://discord.com/oauth2/authorize?client_id=576435404107022347&permissions=70289472&scope=bot).
