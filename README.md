# bot.exe

This bot is made with the goal of being fun to use, and being easy to administrate and hack on.
It has a simple plugin system, which can add, remove and update plugins (every plugin is a command) without restarting the bot.
It can also reload the configuration from disk without restarting.

If you don't need those live functions, you can enable a caching system which improves performance. You can still manually reload the commands live, by running the bot's `clearcache` command.

# usage

You setup the bot by running the `installer.js` script in the `database` folder. You can then edit the file in `database/storage/config.json` to your liking. You can choose to add one or more sysadmins (id's of discord users who can eg. update/restart the bot, live reload the database and config or clear the cache) and add in your bot token. You can get an api key at the [Discord developer portal](https://discord.com/developers).

If you want to have a custom default config for new servers, you can do so by either editing `database/default_config.json` (not recommended, because it might cause conflicts when updating from github) or by overriding values in the `default_config` key in the `database/storage/config.json`. (An example is given by overriding the prefix). Note that this, for now, only works for the top level keys, so subobjects need to be fully copied over.

You can also just add it to your server using [this link](https://discord.com/api/oauth2/authorize?client_id=576435404107022347&permissions=3205184&scope=bot).
