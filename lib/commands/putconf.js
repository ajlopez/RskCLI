
const configs = require('../config');
const simpleargs = require('simpleargs');

function execute(args, opts) {
    args = simpleargs(args);
    
    const name = args._[0];
    
    const config = configs.loadConfiguration();
    
    configs.putConfiguration(config, name);
    
    console.log('save to', 'rskcli-' + name + '.json');
    
    return config;
}

module.exports = {
    execute
};