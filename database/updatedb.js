// only indended for manual usage, to introduce or deprecate database enties or when db reorganisation.

const fs = require("fs");
const path = require("path");
const cwd = process.cwd();

const database = "servers";

const dbpath = path.join(__dirname, "storage", database + ".json");
const backuppath = path.join(__dirname, "storage", database + ".json");

// run this manually or only on first run. MAYBE CONTAIN BUG
// fs.writeFileSync(backuppath, fs.readFileSync(dbpath));



let database = JSON.parse(fs.readFileSync(dbpath).toString());

for (id in database) {
    let commandblocklist = database[id].blocklist;
    database[id].blocklist = {
        commands:commandblocklist,
        utils:[]
    }
}


fs.writeFileSync(dbpath, JSON.stringify(database, null, 4));

//TODO make relative to file location paths