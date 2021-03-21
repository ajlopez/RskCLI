
const rskapi = require('rskapi');
const configs = require('../config');
const utils = require('../utils');
const simpleargs = require('simpleargs');

let config;
let client;

simpleargs.define('l','log',false,'Log', { flag: true });
simpleargs.define('d', 'decimals', false, 'Decimals', { flag: true });

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
    args = simpleargs(args);
    
    config = configs.loadConfiguration();
    
    client = getClient();
        
    if (args.log)
        client.host().provider().setLog(true);

    const instances = {};
    
    for (let n in config.instances) {
        const instance = {};
        
        instance.address = utils.getAddress(config, n);
        
        if (config.instances[n].contract)
            instance.contract = config.instances[n].contract;
            
        instance.balance = await client.balance(instance.address);
        instance.nonce = await client.nonce(instance.address);

        let balance = utils.getValue(instance.balance);
        
        if (args.decimals)
            balance = utils.withDecimals(balance, 18);
            
        const nonce = parseInt(instance.nonce);
        
        console.log('name', n);
        console.log('address', instance.address);
        if (instance.contract)
            console.log('contract', instance.contract);
        console.log('balance', balance);
        console.log('nonce', nonce);
        console.log();
        
        instances[n] = instance;
    }
    
    return instances;
}

module.exports = {
    useClient,
    execute
};

