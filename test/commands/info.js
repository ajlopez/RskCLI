
const info = require('../../lib/commands/info');
const configs = require('../../lib/config');
const sethost = require('../../lib/commands/sethost');
const rskapi = require('rskapi');

exports['get host, block number, chain id, network version and client version'] = async function (test) {
    sethost.execute([ 'http://localhost:4444' ]);
    const config = configs.loadConfiguration();
    
    const provider = createProvider();
    
    provider.eth_blockNumber = function () { return 42; };
    provider.eth_chainId = function () { return 33; };
    provider.net_version = function () { return 144; };
    provider.web3_clientVersion = function () { return 'version'; };
        
    info.useClient(rskapi.client(provider));
    
    const result = await info.execute([]);
    
    test.ok(result);
    test.deepEqual(result, { 
        host: 'http://localhost:4444',
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

