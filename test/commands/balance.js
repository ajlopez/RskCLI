
const balance = require('../../lib/commands/balance');
const configs = require('../../lib/config');
const newaccount = require('../../lib/commands/newaccount');

exports['get alice balance'] = async function (test) {
    newaccount.execute([ 'alice' ]);   
    
    const config = configs.loadConfiguration();
    
    const client = {
        balance: function (address) {
            test.equal(address, config.accounts.alice.address);
            
            return '0x100';
        }
    };
    
    balance.useClient(client);
    
    const result = await balance.execute([ 'alice' ]);
    
    test.ok(result);
    test.strictEqual(result, 256);
    
    test.done();
};

