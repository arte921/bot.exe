const fs = require("fs");
const path = require("path");

const storagedir = path.join(__dirname, "storage");
const backupdir = path.join(__dirname, "backup");

module.exports = {
    save: (database, contents) => {   // stores the database variable and creates a backup of the old copy
        const dbpath = path.join(storagedir, database + ".json");
        const backuppath = path.join(backupdir, database + ".json");
        
        fs.writeFileSync(backuppath, fs.readFileSync(dbpath));  // backup db, in case of corruption
        fs.writeFileSync(dbpath, JSON.stringify(contents, null, 4)); // write the actual database. Pretty formatting for easy administration.
    },
    load: (database) => {
        const dbpath = path.join(storagedir, database + ".json");
        return JSON.parse(fs.readFileSync(dbpath).toString());
    }
}