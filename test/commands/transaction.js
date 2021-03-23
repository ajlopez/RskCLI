
const transaction = require('../../lib/commands/transaction');
const configs = require('../../lib/config');

exports['get transaction'] = async function (test) {
    const config = configs.loadConfiguration();
    
    const client = {
        transaction: function (hash) {
            test.equal(hash, '0x010203');
            
            return { gas: '0x1000' };
        }
    };
    
    transaction.useClient(client);
    
    const result = await transaction.execute([ '0x010203' ]);
    
    test.ok(result);
    test.deepEqual(result, { gas: '0x1000' });
    
    test.done();
};

exports['get latest transaction'] = async function (test) {
    const config = configs.loadConfiguration();
    
    config.latest = {
        transaction: '0x010203'
    }
    
    configs.saveConfiguration(config);
    
    const client = {
        transaction: function (hash) {
            test.equal(hash, '0x010203');
            
            return { gas: '0x1000' };
        }
    };
    
    transaction.useClient(client);
    
    const result = await transaction.execute([]);
    
    test.ok(result);
    test.deepEqual(result, { gas: '0x1000' });
    
    test.done();
};

exports['get latest transaction using latest'] = async function (test) {
    const config = configs.loadConfiguration();
    
    config.latest = {
        transaction: '0x010203'
    }
    
    configs.saveConfiguration(config);
    
    const client = {
        transaction: function (hash) {
            test.equal(hash, '0x010203');
            
            return { gas: '0x1000' };
        }
    };
    
    transaction.useClient(client);
    
    const result = await transaction.execute([]);
    
    test.ok(result);
    test.deepEqual(result, { gas: '0x1000' });
    
    test.done();
};

exports['get transaction property'] = async function (test) {
    const config = configs.loadConfiguration();
    
    const client = {
        transaction: function (hash) {
            test.equal(hash, '0x010203');
            
            return { gas: '0x1000' };
        }
    };
    
    transaction.useClient(client);
    
    const result = await transaction.execute([ '0x010203', 'gas' ]);
    
    test.ok(result);
    test.strictEqual(result, 0x1000);
    
    test.done();
};

