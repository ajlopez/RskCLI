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
    const name = args._[1];
    const cname = args._[2];
    
    let cpath;
    let ctypes;
    let cargs;
    
    if (args._.length > 4) {
        ctypes = utils.getTypes(args._[3]);
        cargs = utils.getArguments(config, args._[4]);
        cpath = args._[5];
    }
    else {
        cpath = args._[3];
        cargs = [];
    }
    
    const contract = utils.getContract(cname, cpath);
    const options = utils.getTransactionOptions(args, config);
    
    if (ctypes)
        options.types = ctypes;
        
    const txh = await client.deploy(
        from,
        contract.bytecode,
        cargs,
        options
    );
    
    if (txh && typeof txh === 'object')
        throw txh;
    
    console.log('transaction', txh);

    if (!config.latest)
        config.latest = {};
        
    config.latest.transaction = txh;            

    if (args.quick) {
        utils.addPending(config, txh, 'deploy', originalArgs,
            {
                instance: name,
                contract: cname,
                path: cpath
        });
        
        configs.saveConfiguration(config);
        
        return txh;
    }
    
    configs.saveConfiguration(config);

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
    
    console.log('instance address', txr.contractAddress);
    
    config.instances[name] = {
        address: txr.contractAddress,
        contract: cname
    };
    
    configs.saveConfiguration(config);
    
    console.log('done');
    
    return txr.contractAddress;
}

module.exports = {
    useClient,
    execute
};

