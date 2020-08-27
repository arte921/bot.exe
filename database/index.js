const fs = require("fs");
const { writeFile, readFile } = require("fs").promises;

const path = require("path");

const storagedir = path.join(__dirname, "storage");
const backupdir = path.join(__dirname, "backup");

module.exports = {
    save: async (database, contents, backup = false) => {   // stores the database variable and creates a backup of the old copy
        const dbpath = path.join(storagedir, database + ".json");
        if (backup) {
            const backuppath = path.join(backupdir, database + Date.now() + ".json");
            await writeFile(backuppath, await readFile(dbpath));
        }
        
        await writeFile(dbpath, JSON.stringify(contents, null, 4)); // write the actual database. Pretty formatting for easy administration.
    },
    load: async database => {
        const dbpath = path.join(storagedir, database + ".json");
        const raw = await readFile(dbpath);
        return JSON.parse(raw.toString());
    },
    file: async (location, relative = false) => {
        const file = relative ? path.join(process.cwd(), ...location) : path.join(...location);
        const raw = await readFile(file)
        return JSON.parse(raw.toString());
    }
}