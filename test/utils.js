
const utils = require('../lib/utils');
const configs = require('../lib/config');
const newaccount = require('../lib/commands/newaccount');

exports['get value from string'] = function (test) {
    const result = utils.getValue('100000');
    
    test.ok(result);
    test.strictEqual(result, 100000);
};

exports['get value from hexa string'] = function (test) {
    const result = utils.getValue('0x100');
    
    test.ok(result);
    test.strictEqual(result, 256);
};

exports['get big value from string'] = function (test) {
    const result = utils.getValue('1000000000000000000000000000');
    
    test.ok(result);
    test.strictEqual(result, '1000000000000000000000000000');
};

exports['get big value from hexa string'] = function (test) {
    const result = utils.getValue('0x1000000000000000000000000000');
    
    test.ok(result);
    test.strictEqual(result, '0x1000000000000000000000000000');
};

exports['get value from long string'] = function (test) {
    const result = utils.getValue('0000000000000000000000000001');
    
    test.ok(result);
    test.strictEqual(result, 1);
};

exports['get value from long hexa string'] = function (test) {
    const result = utils.getValue('0x0000000000000000000000000001');
    
    test.ok(result);
    test.strictEqual(result, 1);
};

exports['get address from account'] = function (test) {
    const account = newaccount.execute([ 'alice' ]);
    const config = configs.loadConfiguration();
    
    const result = utils.getAddress(config, 'alice');
    
    test.ok(result);
    test.equal(result, account.address);
};

exports['get address from simple account'] = function (test) {
    const config = configs.loadConfiguration();
    config.accounts.alice = '0x010203';
    configs.saveConfiguration(config);
    
    const result = utils.getAddress(config, 'alice');
    
    test.ok(result);
    test.equal(result, config.accounts.alice);
};

exports['get account'] = function (test) {
    const account = newaccount.execute([ 'alice' ]);
    const config = configs.loadConfiguration();
    
    const result = utils.getAccount(config, 'alice');
    
    test.ok(result);
    test.deepEqual(result, account);
};

exports['get unknown account'] = function (test) {
    const config = configs.loadConfiguration();
    const result = utils.getAccount(config, 'foo');
    
    test.strictEqual(result, null);
};

exports['get unknown address'] = function (test) {
    const config = configs.loadConfiguration();
    const result = utils.getAddress(config, 'foo');
    
    test.strictEqual(result, null);
};
