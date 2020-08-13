// only indended for manual usage, to introduce or deprecate database enties or when db reorganisation.

const fs = require("fs");
const path = require("path");
const cwd = process.cwd();

const { save, load } = require(path.join(__dirname, "index.js"));

const dbname = "servers";

let database = load(dbname);

for (id in database) {
    
    let boldchannels = database[id].boldchannels;
    delete database[id].boldchannels;
    database[id].errands = {
        enabled:[],
        configs:{
            boldchannels:boldchannels,
            bumpchannels:[]
        }
    }
    
    let blocklist = database[id].blocklist;
    database[id].blocklist = blocklist;
}


save(dbname, database);

//TODO make relative to file location paths