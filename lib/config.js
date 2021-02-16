
const fs = require('fs');

function loadConfiguration(filename) {
    filename = filename || 'rskcli.json';
    
    try {
        return JSON.parse(fs.readFileSync(filename).toString());
    }
    catch (ex) {
        console.log(ex);
        
        return {
            host: null,
            accounts: {},
            instances: {},
            options: {}
        };
    }    
}

module.exports = {
    loadConfiguration
};

