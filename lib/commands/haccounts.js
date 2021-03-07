
const rskapi = require('rskapi');
const configs = require('../config');
const simpleargs = require('simpleargs');

let config;
let client;

simpleargs.define('l','log',false,'Log', { flag: true });

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
    const client = getClient();
    
    args = simpleargs(args);
    
    if (args.log)
        client.host().provider().setLog(true);

    const accounts = await client.accounts();

    for (let k = 0; k < accounts.length; k++)
        console.log(accounts[k]);
    
    return accounts;
}

module.exports = {
    useClient,
    execute
};

