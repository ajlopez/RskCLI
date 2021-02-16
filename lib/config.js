
const fs = require('fs');

function loadConfiguration(filename) {
    filename = filename || 'rskcli.json';
    
    try {
        return JSON.parse(fs.readFileSync(filename).toString());
    }
    catch (ex) {
        return {
            host: null,
            accounts: {},
            instances: {},
            options: {}
        };
    }    
}

function saveConfiguration(config, filename) {
    filename = filename || 'rskcli.json';
    
    fs.writeFileSync(filename, JSON.stringify(config, null, 4));
}

module.exports = {
    loadConfiguration,
    saveConfiguration
};

