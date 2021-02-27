
const rskapi = require('rskapi');
const configs = require('../config');

let config;
let client;

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
    config = configs.loadConfiguration();
    const client = getClient();

    const blockNumber = await client.number();
    const chainId = await promisify(cb => client.host().provider().call('eth_chainId', [], cb));
    
    return { 
        host: config.host,
        blockNumber: blockNumber,
        chainId: chainId
    };
}

module.exports = {
    useClient,
    execute
};

