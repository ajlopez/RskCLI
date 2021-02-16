
const newaccount = require('../../lib/commands/newaccount');
const configs = require('../../lib/config');

exports['new account'] = function (test) {
    const config = configs.loadConfiguration();
    
    delete config.accounts.alice;
    
    configs.saveConfiguration(config);
    
    const result = newaccount.execute([ 'alice' ]);
    
    test.ok(result);
    
    const newconfig = configs.loadConfiguration();
    
    test.ok(newconfig);
    test.ok(newconfig.accounts);
    test.ok(newconfig.accounts.alice);
    test.ok(typeof newconfig.accounts.alice === 'object');

    test.ok(newconfig.accounts.alice.privateKey);
    test.ok(newconfig.accounts.alice.publicKey);
    test.ok(newconfig.accounts.alice.address);
    
    test.deepEqual(result, newconfig.accounts.alice);
};

