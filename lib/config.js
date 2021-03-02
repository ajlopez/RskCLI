
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

function putConfiguration(config, confname) {
    if (confname.indexOf('.') >= 0)
        throw "Invalid configuration name";
        
    saveConfiguration(config, 'rskcli-' + confname + '.json');
}

function getConfiguration(confname) {
    if (confname.indexOf('.') >= 0)
        throw "Invalid configuration name";
        
    const config = loadConfiguration('rskcli-' + confname + '.json');
    
    saveConfiguration(config);
}

module.exports = {
    loadConfiguration,
    saveConfiguration,
    putConfiguration,
    getConfiguration
};

