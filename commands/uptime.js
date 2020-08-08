module.exports = async (msg) => {
    let seconds = Math.floor(process.uptime());
    let mins = Math.floor(seconds / 60);
    let hours = Math.floor(mins / 60);
    let days = Math.floor(hours / 24);
    msg.channel.send(
        `${days} days, ${hours % 24} hours, ${mins % 60} minutes, ${seconds % 60} seconds`
    );
};
