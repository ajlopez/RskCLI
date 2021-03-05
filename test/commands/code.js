
const code = require('../../lib/commands/code');
const newaccount = require('../../lib/commands/newaccount');
const configs = require('../../lib/config');

exports['get code'] = async function (test) {
    const config = configs.loadConfiguration();
    
    const client = {
        code: function (hash) {
            test.equal(hash, '0x010203');
            
            return '0x1000';
        }
    };
    
    code.useClient(client);
    
    const result = await code.execute([ '0x010203' ]);
    
    test.ok(result);
    test.equal(result, '0x1000');
    
    test.done();
};

exports['get code using alias'] = async function (test) {
    newaccount.execute([ 'contract' ]);   
    
    const config = configs.loadConfiguration();
    
    const client = {
        code: function (hash) {
            test.equal(hash, config.accounts.contract.address);
            
            return '0x1000';
        }
    };
    
    code.useClient(client);
    
    const result = await code.execute([ 'contract' ]);
    
    test.ok(result);
    test.equal(result, '0x1000');
    
    test.done();
};
