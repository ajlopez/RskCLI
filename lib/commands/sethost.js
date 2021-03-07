
const configs = require('../config');
const utils = require('../utils');

function execute(args) {
    const host = utils.getHost(args[0]);
    
    const config = configs.loadConfiguration();
    
    config.host = host;
    
    configs.saveConfiguration(config);
}

module.exports = {
    execute
}