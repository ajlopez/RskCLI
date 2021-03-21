
const rskapi = require('rskapi');
const configs = require('../config');
const simpleargs = require('simpleargs');

let config;

function getConfig() {
    if (config)
        return config;
    
    config = configs.loadConfiguration();
    
    return config;
}

async function execute(args, opts) {
    args = simpleargs(args);
    const name = args._[0];
    const address = args._[1];
    
    config = getConfig();
    
    console.log('address', address);
    config.instances[name] = address;
    
    configs.saveConfiguration(config);
    
    return address;
}

module.exports = {
    execute
};

