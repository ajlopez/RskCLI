
const configs = require('../config');
const simpleargs = require('simpleargs');

function execute(args, opts) {
    args = simpleargs(args);
    
    const name = args._[0];
    
    configs.getConfiguration(name);
    
    console.log('restore from', 'rskcli-' + name + '.json');
    
    return configs.loadConfiguration();
}

module.exports = {
    execute
};