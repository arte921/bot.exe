const fs = require("fs");

// fs.writeFileSync("./backup.json", fs.readFileSync("./database.json"));

let database = JSON.parse(fs.readFileSync("./database.json").toString());

for (id in database) {
    let commandblocklist = database[id].blocklist;
    database[id].blocklist = {
        commands:commandblocklist,
        errands:[]
    }
}


fs.writeFileSync("./database.json", JSON.stringify(database, null, 4));