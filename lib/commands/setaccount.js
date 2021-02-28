
const rskapi = require('rskapi');
const configs = require('../config');

let config;
let client;

function getConfig() {
    if (config)
        return config;
    
    config = configs.loadConfiguration();
    
    return config;
}

function getClient() {
    if (client)
        return client;
    
    client = rskapi.client(getConfig().host);
    
    return client;
}

function useClient(newclient) {
    client = newclient;
}

async function execute(args, opts) {
    const name = args[0];
    const param = args[1];
    let address;

    if (typeof param === 'string' && param.startsWith('0x'))
        if (param.length > 20 * 2 + 2) {
            const account = rskapi.account(param);
            
            config = getConfig();
            console.dir('address', account.address);
            config.accounts[name] = account;
            
            configs.saveConfiguration(config);
            
            return account;
        }
        else
            address = param;
    else {
        const nacc = parseInt(param);
        const client = getClient();
        
        const accounts = await client.accounts();
        
        address = accounts[nacc];
    }
    
    config = getConfig();
    
    console.dir('address', address);
    config.accounts[name] = address;
    
    configs.saveConfiguration(config);
    
    return address;
}

module.exports = {
    useClient,
    execute
};

