
const receipt = require('../../lib/commands/receipt');
const configs = require('../../lib/config');

exports['get receipt'] = async function (test) {
    const config = configs.loadConfiguration();
    
    const client = {
        receipt: function (hash) {
            test.equal(hash, '0x010203');
            
            return { gasUsed: '0x1000' };
        }
    };
    
    receipt.useClient(client);
    
    const result = await receipt.execute([ '0x010203' ]);
    
    test.ok(result);
    test.deepEqual(result, { gasUsed: '0x1000' });
    
    test.done();
};

exports['get receipt property'] = async function (test) {
    const config = configs.loadConfiguration();
    
    const client = {
        receipt: function (hash) {
            test.equal(hash, '0x010203');
            
            return { gasUsed: '0x1000' };
        }
    };
    
    receipt.useClient(client);
    
    const result = await receipt.execute([ '0x010203', 'gasUsed' ]);
    
    test.ok(result);
    test.strictEqual(result, 0x1000);
    
    test.done();
};

