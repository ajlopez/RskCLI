
const rskapi = require('rskapi');
const configs = require('../config');
const simpleargs = require('simpleargs');

let config;
let client;

simpleargs.define('l','log',false,'Log', { flag: true });

// from https://ethereum.stackexchange.com/questions/11444/web3-js-with-promisified-api

const promisify = (inner) =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) { reject(err) }

      resolve(res);
    })
);

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
    let provider = args[0];
    
    args = simpleargs(args);
    
    config = configs.loadConfiguration();
    let client;
    
    if (args._[0])
        provider = args._[0];

    let host;

    if (!provider) {
        client = getClient();
        host = config.host;
    }
    else {
        client = rskapi.client(provider);
        host = provider;
    }
    
    if (args.log)
        client.host().provider().setLog(true);

    const blockNumber = await client.number();
    const chainId = await promisify(cb => client.host().provider().call('eth_chainId', [], cb));
    const networkVersion = await promisify(cb => client.host().provider().call('net_version', [], cb));
    const clientVersion = await promisify(cb => client.host().provider().call('web3_clientVersion', [], cb));
    
    const datetime = new Date();
    
    console.log('host', host);
    console.log('block number', blockNumber);
    console.log('chain id', chainId);
    console.log('network version', networkVersion);
    console.log('client version', clientVersion);
    console.log('date/time', datetime);
    
    return { 
        host,
        blockNumber,
        chainId,
        networkVersion,
        clientVersion,
        datetime
    };
}

module.exports = {
    useClient,
    execute
};

