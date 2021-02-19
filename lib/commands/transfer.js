const rskapi = require('rskapi');
const configs = require('../config');
const utils = require('../utils');
const simpleargs = require('simpleargs');

let config;
let client;

simpleargs.define('g','gas',0,'Gas');

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
    
    args = simpleargs(args);
    
    const from = utils.getAccount(config, args._[0]);
    const to = utils.getAddress(config, args._[1]);
    const value = utils.getValue(args._[2]);
    const options = {};
    
    if (args.gas)
        options.gas = args.gas;
    
    const client = getClient();
    
    try {
        const txh = await client.transfer(
            from,
            to,
            value,
            options
        );
        console.log('transaction', txh);

        // TODO inform times in argument options
        const txr = await client.receipt(txh, 0);
        
        if (!txr)
            console.log('timeout');
        else        
            console.log(parseInt(txr.status) ? 'done' : 'failed');
        
        return txr;
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

