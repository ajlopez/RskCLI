
const configs = require('../config');
const rskapi = require('rskapi');

function execute(args) {
    const name = args[0];
    const account = rskapi.account();
    
    const config = configs.loadConfiguration();
    
    config.accounts[name] = account;
    
    configs.saveConfiguration(config);
    
    console.log('address', account.address);
    
    return account;
}

module.exports = {
    execute
}

