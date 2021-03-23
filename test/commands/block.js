
const block = require('../../lib/commands/block');
const configs = require('../../lib/config');

exports['get block'] = async function (test) {
    const config = configs.loadConfiguration();
    
    const client = {
        block: function (hash) {
            test.equal(hash, '0x010203');
            
            return { gas: '0x1000' };
        }
    };
    
    block.useClient(client);
    
    const result = await block.execute([ '0x010203' ]);
    
    test.ok(result);
    test.deepEqual(result, { gas: '0x1000' });
    
    test.done();
};

exports['get block property'] = async function (test) {
    const config = configs.loadConfiguration();
    
    const client = {
        block: function (hash) {
            test.equal(hash, '0x010203');
            
            return { gasLimit: '0x1000' };
        }
    };
    
    block.useClient(client);
    
    const result = await block.execute([ '0x010203', 'gasLimit' ]);
    
    test.ok(result);
    test.strictEqual(result, 0x1000);
    
    test.done();
};

