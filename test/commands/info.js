
const info = require('../../lib/commands/info');
const configs = require('../../lib/config');
const sethost = require('../../lib/commands/sethost');
const rskapi = require('rskapi');

// from https://ethereum.stackexchange.com/questions/11444/web3-js-with-promisified-api

const promisify = (inner) =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) { reject(err) }

      resolve(res);
    })
);

exports['get host, block number, chain id, network version and client version'] = async function (test) {
    sethost.execute([ 'http://localhost:4444' ]);
    const config = configs.loadConfiguration();
    
    delete config.info;
    
    configs.saveConfiguration(config);
    
    const provider = createProvider();
    
    provider.eth_blockNumber = function () { return 42; };
    provider.eth_chainId = function () { return 33; };
    provider.net_version = function () { return 144; };
    provider.web3_clientVersion = function () { return 'version'; };
        
    info.useClient(rskapi.client(provider));
    
    const result = await info.execute([]);

    test.ok(result);
    test.ok(result.datetime);
    delete result.datetime;
    
    const newconfig = configs.loadConfiguration();
    
    test.ok(!newconfig.info);
    
    test.deepEqual(result, { 
        host: 'http://localhost:4444',
        blockNumber: 42,
        chainId: 33,
        networkVersion: 144,
        clientVersion: 'version'
    });
    
    test.done();
};

exports['get host, block number, chain id, network version and client version using save flag'] = async function (test) {
    sethost.execute([ 'http://localhost:4444' ]);
    const config = configs.loadConfiguration();
    
    delete config.info;
    
    configs.saveConfiguration(config);
    
    const provider = createProvider();
    
    provider.eth_blockNumber = function () { return 42; };
    provider.eth_chainId = function () { return 33; };
    provider.net_version = function () { return 144; };
    provider.web3_clientVersion = function () { return 'version'; };
        
    info.useClient(rskapi.client(provider));
    
    const result = await info.execute([ '--save' ]);

    test.ok(result);
    test.ok(result.datetime);
    delete result.datetime;
    
    const newconfig = configs.loadConfiguration();
    
    test.ok(newconfig.info);
    test.ok(newconfig.info.datetime);
    delete newconfig.info.datetime;
    test.deepEqual(newconfig.info, result);
    
    test.deepEqual(result, { 
        host: 'http://localhost:4444',
        blockNumber: 42,
        chainId: 33,
        networkVersion: 144,
        clientVersion: 'version'
    });
    
    test.done();
};

exports['get block velocity after save'] = async function (test) {
    sethost.execute([ 'http://localhost:4444' ]);
    const config = configs.loadConfiguration();
    
    delete config.info;
    
    configs.saveConfiguration(config);
    
    const provider = createProvider();
    
    provider.eth_blockNumber = function () { return 42; };
    provider.eth_chainId = function () { return 33; };
    provider.net_version = function () { return 144; };
    provider.web3_clientVersion = function () { return 'version'; };
        
    info.useClient(rskapi.client(provider));
    
    await info.execute([ '--save' ]);

    provider.eth_blockNumber = function () { return 100; };
    
    await promisify(cb => setTimeout(function () { cb(null, null); }, 1000));

    const result = await info.execute([]);

    test.ok(result);
    test.ok(result.blocksPerHour);
    
    test.done();
};

exports['using another host/provider'] = async function (test) {
    sethost.execute([ 'http://localhost:4444' ]);
    const config = configs.loadConfiguration();
    
    const provider = createProvider();
    
    provider.eth_blockNumber = function () { return 42; };
    provider.eth_chainId = function () { return 33; };
    provider.net_version = function () { return 144; };
    provider.web3_clientVersion = function () { return 'version'; };
        
    const result = await info.execute([ provider ]);
    
    test.ok(result);
    test.ok(result.host);
    test.ok(typeof result.host === 'object');
    test.ok(typeof result.host.call === 'function');
    
    delete result.host;
    delete result.datetime;
    
    test.deepEqual(result, { 
        blockNumber: 42,
        chainId: 33,
        networkVersion: 144,
        clientVersion: 'version'
    });
    
    test.done();
};

function createProvider() {
	return {
		call: function (method, args, cb) {
			cb(null, this[method].apply(this,args));
		}
	}
}

