
const instances = require('../../lib/commands/instances');
const configs = require('../../lib/config');
const setinstance = require('../../lib/commands/setinstance');
const rskapi = require('rskapi');

const addresses = [
  '0x4e16fc0dd89574d8958ec1851aa332dae3d9521d',
  '0xacf41292527644309da44489f07c3b2996db6fca',
  '0xbb8fa97e5bf9ab4f88fd4585994ac9a282b56369',
  '0x8f14fbd795ed9b546953f1b241474ff8d8a64358',
  '0x41ef8be35347cd3c383bf3eb7a8c77ef5ddd6e28',
  '0x26ebc07d905d44bfd817b38a5e9570c8efe29954',
  '0x262d5f46eaaa2e7250b98510abd08e8529e7dbe2',
  '0x8d33c60e10ae7ca189abc437f19b644fad2aa76e',
  '0x895a3b67087f63b0ca1d19026fbaf69e87457f6c',
  '0x54650c91f6cd0cf3fc784c87cb26180c26bfb1e8'
];

exports['get instances info'] = async function (test) {
    const config = configs.loadConfiguration();
    
    config.instances = {};
    
    configs.saveConfiguration(config);
    
    setinstance.execute([ 'counter', addresses[0] ]);
    setinstance.execute([ 'token', addresses[1] ]);
    
    const newconfig = configs.loadConfiguration();
    
    const provider = createProvider();
    
    let balance = 1000;
    let nonce = 0;
    
    provider.eth_getBalance = function () { balance++; return balance; };
    provider.eth_getTransactionCount = function () { nonce++; return nonce; };
        
    instances.useClient(rskapi.client(provider));
    
    const result = await instances.execute([]);

    test.ok(result);
    test.ok(result.counter);
    test.ok(result.token);
    
    test.equal(result.counter.address, newconfig.instances.counter);
    test.equal(result.token.address, newconfig.instances.token);
    
    test.equal(result.counter.balance, 1001);
    test.equal(result.token.balance, 1002);
    
    test.equal(result.counter.nonce, 1);
    test.equal(result.token.nonce, 2);
    
    test.done();
};

function createProvider() {
	return {
		call: function (method, args, cb) {
			cb(null, this[method].apply(this,args));
		}
	}
}

