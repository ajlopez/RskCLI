
const transfer = require('../../lib/commands/transfer');
const configs = require('../../lib/config');
const newaccount = require('../../lib/commands/newaccount');

exports['transfer'] = async function (test) {
    newaccount.execute([ 'alice' ]);   
    newaccount.execute([ 'bob' ]);
    
    const config = configs.loadConfiguration();
    
    const client = {
        transfer: function (from, to, value, options) {
            test.deepEqual(from, config.accounts.alice);
            test.equal(to, config.accounts.bob.address);
            test.strictEqual(value, 100000);
            test.deepEqual(options, {});
            
            return '0x010203';
        }
    };
    
    transfer.useClient(client);
    
    const tx = await transfer.execute([ 'alice', 'bob', '100000' ]);
    
    test.ok(tx);
    test.equal(tx, '0x010203');
    
    test.done();
};

