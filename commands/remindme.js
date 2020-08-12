//

module.exports = (msg, argstring, config) => {
    let firstspace = argstring.indexOf(" ");
    firstspace = firstspace < 0 ? argstring.length : firstspace;
    const time = argstring.substr(0, firstspace);
    const note = argstring.substr(firstspace + 1);
    
    console.log(time, note);
    setTimeout(() => {
        msg.reply(note);
    }, time);
    
};
