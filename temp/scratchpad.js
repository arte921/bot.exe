const path = require("path");
const cwd = process.cwd();
const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));


const fun = _ => "yes";

console.log(fun());


/*
        // load timers
        const current = Date.now();
        for (timestamp in servers[guild.id].reminders) {
            const timer = servers[guild.id].reminders[timestamp];
            const channel = await client.channels.fetch(timer.channel);
            console.log(channel);
            if (timestamp > current) {
                setTimeout(() => {
                    channel.send(`<@${timer.user}>, ${timer.message}`);
                    delete servers[msg.guild.id].reminders[timestamp];
                    await save("servers", servers);
                }, timestamp - current);
            } else if (current - timestamp < 60000) { // 1 minute
                channel.send(`<@${timer.user}>, ${timer.message}`);
            } else {
                channel.send(`<@${timer.user}>, here is a reminder for ${timer.message} you set for ${humandate(current - timestamp)} ago :)`);
            }
        }*/