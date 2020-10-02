const fs = require("fs");
const path = require("path");
const { save, load, file } = require(path.join(__dirname, "index.js"));

const servers = file([__dirname, "defaults", "servers.json"]);
const globalconfig = file([__dirname, "defaults", "config.json"]);
globalconfig.default_config = file([__dirname, "default_config.json"]);
save("config", globalconfig);