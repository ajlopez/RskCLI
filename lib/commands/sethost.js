
const configs = require('../config');

function execute(args) {
    const host = args[0];
    
    const config = configs.loadConfiguration();
    
    config.host = host;
    
    configs.saveConfiguration(config);
}

module.exports = {
    execute
}