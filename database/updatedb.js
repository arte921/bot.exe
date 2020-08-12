// only indended for manual usage, to introduce or deprecate database enties or when db reorganisation.

const fs = require("fs");
const path = require("path");

const cwd = process.cwd();

const dbpath = path.join(cwd, "servers.json")

// run this manually or only on first run. MAYBE CONTAIN BUG
// fs.writeFileSync(path.join(cwd, "temp", "backup.json"), fs.readFileSync(dbpath));



let database = JSON.parse(fs.readFileSync(dbpath).toString());

for (id in database) {
    let commandblocklist = database[id].blocklist;
    database[id].blocklist = {
        commands:commandblocklist,
        errands:[]
    }
}


fs.writeFileSync(dbpath, JSON.stringify(database, null, 4));

//TODO make relative to file location paths