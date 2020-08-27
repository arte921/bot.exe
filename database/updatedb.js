// Syncs up all entries in "servers" database to be like in "config" db's default_config property. 

const path = require("path");

const { save, load, file } = require(path.join(__dirname, "index.js"));

let database, exampledb;

async function dostuff (dbname = "servers") {
    database = await load(dbname);

    exampledb = {
        ...await file([__dirname, "default_config.json"]),
        ...(await load("config")).default_config
    };

    for (id in database) {
        sync(database[id], exampledb);
    }
    
    await save(dbname, database, true);
}

function sync (object, example) {
    for (key in example) {
        if (!object[key] && example[key]) {
            object[key] = example[key];
        } else if (typeof(object[key]) == "object" && !Array.isArray(object[key]) && !example[key].placeholder) {
            sync (object[key], example[key]);
        }
    }

    for (key in object) {
        if (!example[key]) {
            delete object[key];
        }
    }
}

dostuff();