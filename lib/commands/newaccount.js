
const configs = require('../config');
const rskapi = require('rskapi');

function execute(args, opts) {
    opts = opts || {};
    const name = args[0];
    const account = rskapi.account();
    
    const config = configs.loadConfiguration();
    
    config.accounts[name] = account;
    
    configs.saveConfiguration(config);
    
    if (opts.verbose)
        console.log('address', account.address);
    
    return account;
}

module.exports = {
    execute
}

