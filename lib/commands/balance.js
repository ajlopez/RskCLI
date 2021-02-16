const rskapi = require('rskapi');
const configs = require('../config');
const utils = require('../utils');

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
    const config = getConfig();
    
    const address = utils.getAddress(config, args[0]);
    
    const client = getClient();
    
    try {
        const value = await client.balance(address);
        
        const balance = utils.getValue(value);
        
        console.log('balance', balance);
        
        return balance;
    }
    catch (ex) {
        if (ex.message)
            console.log("error:", ex.message);
        else
            console.log("error:", ex);
    }
}

module.exports = {
    useClient,
    execute
};

