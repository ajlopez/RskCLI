const rskapi = require('rskapi');
const configs = require('../config');
const utils = require('../utils');
const simpleargs = require('simpleargs');

let config;
let client;

simpleargs.define('g','gas',0,'Gas');
simpleargs.define('gp','gasPrice',0,'Gas Price');
simpleargs.define('l','log',false,'Log', { flag: true });
simpleargs.define('q','quick',false,'Quick Transaction', { flag: true });

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
    const originalArgs = args;
    
    config = configs.loadConfiguration();
    client = getClient();
    
    args = simpleargs(args);
    
    if (args.log)
        client.host().provider().setLog(true);

    const from = utils.getAccount(config, args._[0]);
    const to = utils.getAddress(config, args._[1]);
    const value = utils.getValue(args._[2]);
    const options = utils.getTransactionOptions(args, config);
        
    try {
        const txh = await client.transfer(
            from,
            to,
            value,
            options
        );
        
        if (txh && typeof txh === 'object')
            throw txh;
        
        console.log('transaction', txh);
        
        if (!config.latest)
            config.latest = {};
            
        config.latest.transaction = txh;            
        
        if (args.quick) {
            utils.addPending(config, txh, 'transfer', originalArgs);
            
            configs.saveConfiguration(config);
            
            return txh;
        }

        configs.saveConfiguration(config);

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

