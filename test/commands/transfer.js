
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
        },
        receipt: function (txhash, times) {
            test.equal(txhash, '0x010203');
            test.equal(times, 0);
            
            return {
                status: '0x1'
            }
        }
    };
    
    transfer.useClient(client);
    
    const txr = await transfer.execute([ 'alice', 'bob', '100000' ]);
    
    test.ok(txr);
    test.deepEqual(txr, { status: '0x1' });
    
    test.done();
};

exports['transfer with quick flag'] = async function (test) {
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
    
    const txhash = await transfer.execute([ 'alice', 'bob', '100000', '--quick' ]);
    
    test.ok(txhash);
    test.equal(txhash, '0x010203');
    
    const newconfig = configs.loadConfiguration();
    
    test.ok(newconfig);
    test.ok(newconfig.pending);
    test.ok(newconfig.pending[txhash]);
    test.equal(newconfig.pending[txhash].description, 'transfer alice bob 100000 --quick');
    
    test.done();
};

exports['transfer with gas in flag'] = async function (test) {
    newaccount.execute([ 'alice' ]);   
    newaccount.execute([ 'bob' ]);
    
    const config = configs.loadConfiguration();
    
    const client = {
        transfer: function (from, to, value, options) {
            test.deepEqual(from, config.accounts.alice);
            test.equal(to, config.accounts.bob.address);
            test.strictEqual(value, 100000);
            test.deepEqual(options, { gas: 100000 });
            
            return '0x010203';
        },
        receipt: function (txhash, times) {
            test.equal(txhash, '0x010203');
            test.equal(times, 0);
            
            return {
                status: '0x1'
            }
        }
    };
    
    transfer.useClient(client);
    
    const txr = await transfer.execute([ 'alice', 'bob', '100000', '-g', 100000 ]);
    
    test.ok(txr);
    test.deepEqual(txr, { status: '0x1' });
    
    test.done();
};

exports['transfer with gas price in flag'] = async function (test) {
    newaccount.execute([ 'alice' ]);   
    newaccount.execute([ 'bob' ]);
    
    const config = configs.loadConfiguration();
    
    const client = {
        transfer: function (from, to, value, options) {
            test.deepEqual(from, config.accounts.alice);
            test.equal(to, config.accounts.bob.address);
            test.strictEqual(value, 100000);
            test.deepEqual(options, { gasPrice: 100000 });
            
            return '0x010203';
        },
        receipt: function (txhash, times) {
            test.equal(txhash, '0x010203');
            test.equal(times, 0);
            
            return {
                status: '0x1'
            }
        }
    };
    
    transfer.useClient(client);
    
    const txr = await transfer.execute([ 'alice', 'bob', '100000', '-gp', 100000 ]);
    
    test.ok(txr);
    test.deepEqual(txr, { status: '0x1' });
    
    test.done();
};

