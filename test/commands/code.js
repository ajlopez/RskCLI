
const code = require('../../lib/commands/code');
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

