
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
    opts = opts || {};
    args = simpleargs(args);
    
    config = configs.loadConfiguration();
    
    client = getClient();
        
    if (args.log)
        client.host().provider().setLog(true);
        
    const gasPrice = await client.host().getGasPrice();

    const accounts = {};
    
    for (let n in config.accounts) {
        const account = {};
        
        account.address = utils.getAddress(config, n);
        account.balance = await client.balance(account.address);
        account.nonce = await client.nonce(account.address);
        
        if (gasPrice)
            account.gas = Math.floor(account.balance / gasPrice);

        let balance = utils.getValue(account.balance);
        
        if (args.decimals)
            balance = utils.withDecimals(balance, 18);
            
        const nonce = parseInt(account.nonce);
        
        if (opts.verbose) {
            console.log('name', n);
            console.log('address', account.address);
            console.log('balance', balance);
            console.log('nonce', nonce);
            
            if (account.gas)
                console.log('gas', account.gas);
                
            console.log();
        }
        
        accounts[n] = account;
    }
    
    return accounts;
}

module.exports = {
    useClient,
    execute
};

