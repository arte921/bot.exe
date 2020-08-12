const newentry = {
    key:"boldchannels",
    value:[]
}


const fs = require("fs");

fs.writeFileSync("./backup.json", fs.readFileSync("./database.json"));

let database = JSON.parse(fs.readFileSync("./database.json").toString());

for (id in database) {
    database[id][newentry.key] = newentry.value;
}


fs.writeFileSync("./database.json", JSON.stringify(database, null, 4));