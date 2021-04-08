const fs = require("fs");
const path = require("path");
const { save, load, file } = require(path.join(__dirname, "index.js"));

const {
    updateMultiplanner
} = require('multiplanner');

(async () => {
    const config = await load("config");
    updateMultiplanner(config.ns_app_key_primary);
})();

/*
const servers = file([__dirname, "defaults", "servers.json"]);
const globalconfig = file([__dirname, "defaults", "config.json"]);
globalconfig.default_config = file([__dirname, "default_config.json"]);
save("config", globalconfig);*/