const rskapi = require('rskapi');
const configs = require('../config');
const utils = require('../utils');
const simpleargs = require('simpleargs');

let config;
let client;

simpleargs.define('g','gas',0,'Gas');
simpleargs.define('gp','gasPrice',0,'Gas Price');
simpleargs.define('v','value',0,'Value');
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
    const fn = args._[2];
    const iargs = utils.getArguments(config, args._[3]);
    
    const options = utils.getTransactionOptions(args, config);
    
    try {
        const txh = await client.invoke(
            from,
            to,
            fn,
            iargs,
            options
        );
        
        if (txh && typeof txh === 'object')
            throw txh;
        
        if (args.quick) {
            utils.addPending(config, txh, 'invoke', originalArgs);
            configs.saveConfiguration(config);
            
            return txh;
        }
        
        // TODO times from arguments options
        const txr = await client.receipt(txh, 0);
        
        if (!txr) {
            console.log('timeout');
            return;
        }

        const status = parseInt(txr.status);
        
        if (!status) {
            console.log('failed');
            return;
        }
                
        console.log('done');
        
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

