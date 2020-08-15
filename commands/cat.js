const fs = require("fs");
const path = require("path");

const cwd = process.cwd();

const catdir = path.join(cwd, "assets", "cats");

const cats = [
    "https://cdn.discordapp.com/attachments/732552333371637813/744226749633790089/cute-cat-videos-lede-1300x882_1.jpg",
    "https://cdn.discordapp.com/attachments/732552333371637813/744226760945696849/0c1ca1955e2b0c5469ba17da2b1b9b96.jpg",
    "https://cdn.discordapp.com/attachments/732552333371637813/744226761361063986/king.jpg",
    "https://cdn.discordapp.com/attachments/732552333371637813/744226762636001390/Russian-Blue_01.jpg",
    "https://cdn.discordapp.com/attachments/732552333371637813/744230579511492668/cute-cat-photos-1593441022.jpg",
    "https://cdn.discordapp.com/attachments/732552333371637813/744230616618500106/aijjLqVBPq0B_VMjsiq-GSBOPEx7bgtAAySKfs9ae0U.jpg"
];

module.exports = async (msg, argstring, config) => {/*
    const cats = fs.readdirSync(catdir);
    const cat = cats[Math.floor(Math.random() * cats.length)];
    const catfilepath = path.join(catdir, cat);*/

    msg.channel.send(cats[Math.floor(Math.random() * cats.length)]);
};