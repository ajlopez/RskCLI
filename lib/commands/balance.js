const rskapi = require('rskapi');
const configs = require('../config');
const utils = require('../utils');
const simpleargs = require('simpleargs');

let config;
let client;

simpleargs.define('d', 'decimals', false, 'Decimals', { flag: true });
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
    config = configs.loadConfiguration();
    const client = getClient();
        
    args = simpleargs(args);

    if (args.log)
        client.host().provider().setLog(true);

    const address = utils.getAddress(config, args._[0]);
    
    try {
        const value = await client.balance(address);
        
        let balance = utils.getValue(value);
        
        if (args.decimals)
            balance = utils.withDecimals(balance, 18);
        
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

