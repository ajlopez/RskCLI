
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
    const nacc = parseInt(args[1]);
    
    const client = getClient();
    
    const accounts = await client.accounts();
    
    const address = accounts[nacc];
    
    console.dir('address', address);
    
    const config = getConfig();
    
    config.accounts[name] = address;
    
    configs.saveConfiguration(config);
    
    return address;
}

module.exports = {
    useClient,
    execute
};

