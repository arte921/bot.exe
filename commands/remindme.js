module.exports = (msg, argstring, config) => {
    let firstspace = argstring.indexOf(" ");
    firstspace = firstspace < 0 ? argstring.length : firstspace;
    const time = argstring.substr(0, firstspace);
    const note = argstring.substr(firstspace + 1);
    
    if (isNaN(time) || time == "") {
        msg.channel.send("Please provide an amount of minutes to wait!");
        return false;
    }

    console.log(time, note);
    setTimeout(() => {
        msg.reply(note);
    }, time * 1000 * 60);
    
};
