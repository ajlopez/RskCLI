
const transaction = require('../../lib/commands/transaction');
const configs = require('../../lib/config');

exports['get transaction'] = async function (test) {
    const config = configs.loadConfiguration();
    
    const client = {
        transaction: function (hash) {
            test.equal(hash, '0x010203');
            
            return { gasUsed: '0x1000' };
        }
    };
    
    transaction.useClient(client);
    
    const result = await transaction.execute([ '0x010203' ]);
    
    test.ok(result);
    test.deepEqual(result, { gasUsed: '0x1000' });
    
    test.done();
};

exports['get transaction property'] = async function (test) {
    const config = configs.loadConfiguration();
    
    const client = {
        transaction: function (hash) {
            test.equal(hash, '0x010203');
            
            return { gasUsed: '0x1000' };
        }
    };
    
    transaction.useClient(client);
    
    const result = await transaction.execute([ '0x010203', 'gasUsed' ]);
    
    test.ok(result);
    test.strictEqual(result, 0x1000);
    
    test.done();
};

