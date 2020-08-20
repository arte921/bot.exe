const decimal = 17;

const definitions = [
    {
        value:1,
        letter:"𝕀"
    },
    {
        value:5,
        letter:"𝕍"
    },
    {
        value:10,
        letter:"𝕏"
    },
    {
        value:50,
        letter:"𝕃"
    },
    {
        value:100,
        letter:"ℂ"
    },
    {
        value:500,
        letter:"𝔻"
    },
    {
        value:1000,
        letter:"𝕄"
    }
].reverse();


module.exports = async (msg, argstring, config) => {
    if (isNaN(argstring) || argstring == "" || argstring <= 0 || !Number.isInteger(argstring - 1)) {
        msg.channel.send("Please provide a positive integer to convert to romans!");
        return;
    }

    let leftover = argstring;
    let result = "";
    definitions.forEach(candidate => {
        while (candidate.value <= leftover) {
            result += candidate.letter;
            leftover -= candidate.value;
        }
    });
    
    msg.channel.send(result);
}
