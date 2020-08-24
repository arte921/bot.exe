const fs = require("fs");
const path = require("path");

const storagedir = path.join(__dirname, "storage");
const backupdir = path.join(__dirname, "backup");

module.exports = {
    save: (database, contents, backup = false) => {   // stores the database variable and creates a backup of the old copy
        const dbpath = path.join(storagedir, database + ".json");
        if (backup) {
            const backuppath = path.join(backupdir, database + Date.now() + ".json");
            fs.writeFileSync(backuppath, fs.readFileSync(dbpath));
        }

        fs.writeFileSync(dbpath, JSON.stringify(contents, null, 4)); // write the actual database. Pretty formatting for easy administration.
    },
    load: (database) => {
        const dbpath = path.join(storagedir, database + ".json");
        return JSON.parse(fs.readFileSync(dbpath).toString());
    },
    file: (location, relative = false) => {
        const file = relative ? path.join(process.cwd(), ...location) : path.join(...location);
        return JSON.parse(fs.readFileSync(file).toString());
    }
}