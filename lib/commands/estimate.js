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

async function processInvoke(args, config, client) {
        const from = utils.getAccount(config, args._[1]);
        const to = utils.getAddress(config, args._[2]);
        const fn = args._[3];
        const iargs = utils.getArguments(config, args._[4]);
        
        const options = utils.getTransactionOptions(args, config);
    
        return await client.estimate(
            from,
            to,
            fn,
            iargs,
            options
        );
}

async function processDeploy(args, config, client) {
    const from = utils.getAccount(config, args._[1]);
    const name = args._[2];
    const cname = args._[3];

    let cpath;
    let ctypes;
    let cargs;
    
    if (args._.length > 5) {
        ctypes = utils.getTypes(args._[4]);
        cargs = utils.getArguments(config, args._[5]);
        cpath = args._[6];
    }
    else {
        cpath = args._[4];
        cargs = [];
    }
    
    const contract = utils.getContract(cname, cpath);
    const options = utils.getTransactionOptions(args, config);
    
    if (ctypes)
        options.types = ctypes;
        
    return await client.estimate(
        from,
        null,
        contract.bytecode,
        cargs,
        options
    );
}

async function execute(args, opts) {
    config = configs.loadConfiguration();
    client = getClient();
    
    args = simpleargs(args);
    
    if (args.log)
        client.host().provider().setLog(true);

    const type = args._[0];
    
    try {
        if (type !== 'invoke' && type !== 'deploy')
            throw "Invalid type '" + type + "': it should be 'invoke' or 'deploy'";

        let result;
        
        if (type === 'invoke')
            result = await processInvoke(args, config, client);
        else if (type === 'deploy')
            result = await processDeploy(args, config, client);
        
        result = utils.getValue(result);
        
        console.log('estimated gas', result);
        
        return result;
    }
    catch (ex) {
        if (ex.message)
            console.log("error:", ex.message);
        else
            console.log("error:", ex);
            
        return { error: ex };
    }
}

module.exports = {
    useClient,
    execute
};

