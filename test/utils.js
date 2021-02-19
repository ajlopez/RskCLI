
const utils = require('../lib/utils');
const configs = require('../lib/config');
const newaccount = require('../lib/commands/newaccount');

const path = require('path');

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
    test.strictEqual(result, '324518553658426726783156020576256');
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

exports['with decimals'] = function (test) {
    test.strictEqual(utils.withDecimals(0, 0), '0');
    test.strictEqual(utils.withDecimals(0, 18), '0');
    test.strictEqual(utils.withDecimals('0', 0), '0');
    test.strictEqual(utils.withDecimals('0', 18), '0');
    test.strictEqual(utils.withDecimals('0x0', 0), '0');
    test.strictEqual(utils.withDecimals('0x0', 18), '0');
    test.strictEqual(utils.withDecimals('000000', 0), '0');
    test.strictEqual(utils.withDecimals('000000', 18), '0');
    test.strictEqual(utils.withDecimals('0x000000', 0), '0');
    test.strictEqual(utils.withDecimals('0x000000', 18), '0');
    test.strictEqual(utils.withDecimals('0x00000000000000000000000', 0), '0');
    test.strictEqual(utils.withDecimals('0x00000000000000000000000', 18), '0');

    test.strictEqual(utils.withDecimals('0x00000000000000000000001', 0), '1');
    test.strictEqual(utils.withDecimals('0x00000000000000000000001', 18), '0.000000000000000001');

    test.strictEqual(utils.withDecimals(100, 0), '100');
    test.strictEqual(utils.withDecimals(100, 6), '0.0001');
    test.strictEqual(utils.withDecimals(100000000, 6), '100');
    test.strictEqual(utils.withDecimals(100000001, 6), '100.000001');
    test.strictEqual(utils.withDecimals(100000010, 6), '100.00001');
}

exports['get null arguments'] = function (test) {
    test.deepEqual(utils.getArguments({}, null), []);
};

exports['get decimal numbers arguments'] = function (test) {
    test.deepEqual(utils.getArguments({}, '123,42'), [ '123', '42' ]);
};

exports['get hexadecimal numbers arguments'] = function (test) {
    test.deepEqual(utils.getArguments({}, '0x0123,0x42'), [ '0x0123', '0x42' ]);
};

exports['get string arguments'] = function (test) {
    test.deepEqual(utils.getArguments({}, '"alice"'), [ 'alice' ]);
    test.deepEqual(utils.getArguments({}, "'alice'"), [ 'alice' ]);
};

exports['get name argument'] = function (test) {
    test.deepEqual(utils.getArguments({}, 'alice'), [ 'alice' ]);
};

exports['get address from simple account argument'] = function (test) {
    test.deepEqual(utils.getArguments({
        accounts: {
            alice: '0x0102'
        }
    }, 'alice'), [ '0x0102' ]);
};

exports['get address from account argument'] = function (test) {
    test.deepEqual(utils.getArguments({
        accounts: {
            alice: {
                address: '0x0102'
            }
        }
    }, 'alice'), [ '0x0102' ]);
};

exports['get contract'] = function (test) {
    const cpath = path.join(__dirname, 'contracts');
    const contract = require(path.join(cpath, 'build', 'contracts', 'Counter.json'));
    
    const result = utils.getContract('Counter', cpath);
    
    test.ok(result);
    test.deepEqual(result, contract);
};

