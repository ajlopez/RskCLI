const rskapi = require('rskapi');
const configs = require('../config');
const utils = require('../utils');
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
    config = configs.loadConfiguration();
    const client = getClient();
        
    args = simpleargs(args);

    if (args.log)
        client.host().provider().setLog(true);
    
    const hash = args._[0];
    const property = args._[1];
    
    try {
        const transaction = await client.transaction(hash);
        
        let result;
        
        if (property) {
            const result = utils.getValue(transaction[property]);
            
            console.log(property, result);
            
            return result;
        }
        else {
            console.log(transaction);
            
            return transaction;
        }
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

