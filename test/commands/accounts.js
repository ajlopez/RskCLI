
const accounts = require('../../lib/commands/accounts');
const configs = require('../../lib/config');
const newaccount = require('../../lib/commands/newaccount');
const rskapi = require('rskapi');

exports['get accounts info'] = async function (test) {
    const config = configs.loadConfiguration();
    
    config.accounts = {};
    
    configs.saveConfiguration(config);
    
    newaccount.execute([ 'alice' ]);
    newaccount.execute([ 'bob' ]);
    
    const newconfig = configs.loadConfiguration();
    
    const provider = createProvider();
    
    let balance = 1000;
    let nonce = 0;
    
    provider.eth_getBalance = function () { balance++; return balance; };
    provider.eth_getTransactionCount = function () { nonce++; return nonce; };
    provider.eth_gasPrice = function () { return 10; };
        
    accounts.useClient(rskapi.client(provider));
    
    const result = await accounts.execute([]);

    test.ok(result);
    test.ok(result.alice);
    test.ok(result.bob);
    
    test.equal(result.alice.address, newconfig.accounts.alice.address);
    test.equal(result.bob.address, newconfig.accounts.bob.address);
    
    test.equal(result.alice.balance, 1001);
    test.equal(result.bob.balance, 1002);
    
    test.equal(result.alice.nonce, 1);
    test.equal(result.bob.nonce, 2);
    
    test.equal(result.alice.gas, 1001/10);
    test.equal(result.bob.gas, 1002/10);
    
    test.done();
};

function createProvider() {
	return {
		call: function (method, args, cb) {
			cb(null, this[method].apply(this,args));
		}
	}
}

