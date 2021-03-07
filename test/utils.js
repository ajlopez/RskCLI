
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

exports['get value from big hexa string'] = function (test) {
    const value = '0x0000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003';
    const result = utils.getValue(value);
    
    test.ok(result);
    test.strictEqual(result, value);
};

exports['get value from big string'] = function (test) {
    const value = '0000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003';
    const result = utils.getValue(value);
    
    test.ok(result);
    test.strictEqual(result, value);
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

exports['get address from instance'] = function (test) {
    const config = configs.loadConfiguration();
    config.instances.hello = { address: '0x010203' };
    configs.saveConfiguration(config);
    
    const result = utils.getAddress(config, 'hello');
    
    test.ok(result);
    test.equal(result, config.instances.hello.address);
};

exports['get address from simple instance'] = function (test) {
    const config = configs.loadConfiguration();
    config.instances.hello = '0x010203';
    configs.saveConfiguration(config);
    
    const result = utils.getAddress(config, 'hello');
    
    test.ok(result);
    test.equal(result, config.instances.hello);
};

exports['get address from explicit address'] = function (test) {
    const config = configs.loadConfiguration();
    const result = utils.getAddress(config, '0x040506');
    
    test.ok(result);
    test.equal(result, '0x040506');
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

exports['get arguments from number'] = function (test) {
    test.deepEqual(utils.getArguments({}, 42), [ 42 ]);
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

exports['get transaction options'] = function (test) {
    test.deepEqual(utils.getTransactionOptions(), {});
    test.deepEqual(utils.getTransactionOptions(null), {});
    test.deepEqual(utils.getTransactionOptions({}), {});
    test.deepEqual(utils.getTransactionOptions({ gas: 100000 }), { gas: 100000 });
    test.deepEqual(utils.getTransactionOptions({ gas: 100000, value: 1000000 }), { gas: 100000, value: 1000000 });
    test.deepEqual(utils.getTransactionOptions({ gas: 100000, quick: true }), { gas: 100000 });    
    test.deepEqual(utils.getTransactionOptions({ gasPrice: 1000, quick: true }), { gasPrice: 1000 });    
};

exports['get transaction options using config'] = function (test) {
    test.deepEqual(utils.getTransactionOptions({}, { options: { gas: 100000 } }), { gas: 100000 });
    test.deepEqual(utils.getTransactionOptions({}, { options: { gas: 100000, value: 1000000 } }), { gas: 100000, value: 1000000 });
    test.deepEqual(utils.getTransactionOptions({}, { options: { gas: 100000, quick: true } }), { gas: 100000 });    
    test.deepEqual(utils.getTransactionOptions({}, { options: { gasPrice: 1000, quick: true } }), { gasPrice: 1000 });    
    test.deepEqual(utils.getTransactionOptions({ gas: 100000 }, { options: { gasPrice: 1000, quick: true } }), { gas: 100000, gasPrice: 1000 });    
    test.deepEqual(utils.getTransactionOptions({ gas: 100000 }, { options: { gasPrice: 1000, quick: true, gas: 1 } }), { gas: 100000, gasPrice: 1000 });    
    test.deepEqual(utils.getTransactionOptions({ value: 100000 }, { options: { gasPrice: 1000, quick: true, value: 1 } }), { gasPrice: 1000, value: 100000 });    
    test.deepEqual(utils.getTransactionOptions({ gasPrice: 100000 }, { options: { gasPrice: 1000, quick: true } }), { gasPrice: 100000 });    
};

exports['get types'] = function (test) {
    test.deepEqual(utils.getTypes(), []);
    test.deepEqual(utils.getTypes(null), []);
    test.deepEqual(utils.getTypes(""), []);
    test.deepEqual(utils.getTypes("  "), []);
    test.deepEqual(utils.getTypes("string"), [ "string" ]);
    test.deepEqual(utils.getTypes("string,bytes"), [ "string", "bytes" ]);
    test.deepEqual(utils.getTypes(" string , bytes"), [ "string", "bytes" ]);
    test.deepEqual(utils.getTypes("(string , bytes)"), [ "string", "bytes" ]);
    test.deepEqual(utils.getTypes("fn(string,bytes)"), [ "string", "bytes" ]);
    test.deepEqual(utils.getTypes("fn()"), []);
};

exports['get host'] = function (test) {
    test.equal(utils.getHost('http://localhost:8545'), 'http://localhost:8545');
    test.equal(utils.getHost('http://localhost:4444'), 'http://localhost:4444');
    test.equal(utils.getHost('http://public-node.rsk.co:443'), 'http://public-node.rsk.co:443');
    test.equal(utils.getHost('ganache'), 'http://localhost:8545');
    test.equal(utils.getHost('truffle'), 'http://localhost:8545');
    test.equal(utils.getHost('hardhat'), 'http://localhost:8545');
    test.equal(utils.getHost('regtest'), 'http://localhost:4444');
    test.equal(utils.getHost('local'), 'http://localhost:4444');
    test.equal(utils.getHost('testnet'), 'https://public-node.testnet.rsk.co:443');
    test.equal(utils.getHost('mainnet'), 'https://public-node.rsk.co:443');
};

