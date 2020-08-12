const fs = require("fs");
const path = require("path");

module.exports = {
    save: (database, contents) => {   // stores the database variable and creates a backup of the old copy
        const dbpath = path.join(__dirname, database + ".json");
        const backuppath = path.join(__dirname, "backups", database + ".json");
        
        fs.writeFileSync(backuppath, fs.readFileSync(dbpath));  // backup db, in case of corruption
        fs.writeFileSync(dbpath, JSON.stringify(contents, null, 4)); // write the actual database. Pretty formatting for easy administration.
    },
    load: (database) => {
        const dbpath = path.join(__dirname, database + ".json");
        return JSON.parse(fs.readFileSync(dbpath).toString());
    }
}