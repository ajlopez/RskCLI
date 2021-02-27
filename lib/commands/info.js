
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
    config = configs.loadConfiguration();
    const client = getClient();

    const blockNumber = await client.number();
    
    return { 
        host: config.host,
        blockNumber: blockNumber
    };
}

module.exports = {
    useClient,
    execute
};

