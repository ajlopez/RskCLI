
const nonce = require('../../lib/commands/nonce');
const configs = require('../../lib/config');

exports['get nonce'] = async function (test) {
    const config = configs.loadConfiguration();
    
    const client = {
        nonce: function (hash) {
            test.equal(hash, '0x010203');
            
            return 42;
        }
    };
    
    nonce.useClient(client);
    
    const result = await nonce.execute([ '0x010203' ]);
    
    test.ok(result);
    test.equal(result, 42);
    
    test.done();
};

exports['get nonce with block'] = async function (test) {
    const config = configs.loadConfiguration();
    
    const client = {
        nonce: function (hash, block) {
            test.equal(hash, '0x010203');
            test.equal(block, 'latest');
            
            return 42;
        }
    };
    
    nonce.useClient(client);
    
    const result = await nonce.execute([ '0x010203', 'latest' ]);
    
    test.ok(result);
    test.equal(result, 42);
    
    test.done();
};

