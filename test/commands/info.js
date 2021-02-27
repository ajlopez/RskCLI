
const info = require('../../lib/commands/info');
const configs = require('../../lib/config');
const sethost = require('../../lib/commands/sethost');
const rskapi = require('rskapi');

exports['get host and block number'] = async function (test) {
    sethost.execute([ 'http://localhost:4444' ]);
    const config = configs.loadConfiguration();
    
    const provider = createProvider();
    
    provider.eth_blockNumber = function () { return 42; };
        
    info.useClient(rskapi.client(provider));
    
    const result = await info.execute([]);
    
    test.ok(result);
    test.deepEqual(result, { 
        host: 'http://localhost:4444',
        blockNumber: 42
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

