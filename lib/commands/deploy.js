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
    const name = args._[1];
    const cname = args._[2];
    const contract = utils.getContract(cname, args._[3]);
    
    const client = getClient();
    
    try {
        const txh = await client.deploy(
            from,
            contract.bytecode,
            [],
            {}
        );
        
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

