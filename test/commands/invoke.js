
const invoke = require('../../lib/commands/invoke');
const configs = require('../../lib/config');
const utils = require('../../lib/utils');
const newaccount = require('../../lib/commands/newaccount');
const simpleabi = require('simpleabi');

const path = require('path');

exports['invoke'] = async function (test) {
    newaccount.execute([ 'alice' ]);   
    newaccount.execute([ 'contract' ]);   
    
    const config = configs.loadConfiguration();
    
    const cpath = path.join(__dirname, '..', 'contracts');
    const contract = require(path.join(cpath, 'build', 'contracts', 'Counter.json'));
    
    const client = {
        invoke: function (from, to, fn, args, options) {
            test.deepEqual(from, config.accounts.alice);
            test.equal(to, config.accounts.contract.address);
            test.deepEqual(options, {});
            test.equal(fn, "bar(string,uint256)");
            test.deepEqual(args, [ 'foo', 42 ]);
            
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
    
    invoke.useClient(client);
    
    const txr = await invoke.execute([ 'alice', 'contract', 'bar(string,uint256)', "foo,42" ]);
    
    test.ok(txr);
    test.deepEqual(txr, { status: '0x1' });
    
    test.done();
};

exports['invoke with quick flag'] = async function (test) {
    newaccount.execute([ 'alice' ]);   
    newaccount.execute([ 'contract' ]);   
    
    const config = configs.loadConfiguration();
    
    const cpath = path.join(__dirname, '..', 'contracts');
    const contract = require(path.join(cpath, 'build', 'contracts', 'Counter.json'));
    
    const client = {
        invoke: function (from, to, fn, args, options) {
            test.deepEqual(from, config.accounts.alice);
            test.equal(to, config.accounts.contract.address);
            test.deepEqual(options, {});
            test.equal(fn, "bar(string,uint256)");
            test.deepEqual(args, [ 'foo', 42 ]);
            
            return '0x010203';
        }
    };
    
    invoke.useClient(client);
    
    const txhash = await invoke.execute([ 'alice', 'contract', 'bar(string,uint256)', "foo,42", '--quick' ]);
    
    test.ok(txhash);
    test.equal(txhash, '0x010203');
    
    const newconfig = configs.loadConfiguration();
    
    test.ok(newconfig);
    test.ok(newconfig.pending);
    test.ok(newconfig.pending[txhash]);
    test.equal(newconfig.pending[txhash].description, 'invoke alice contract bar(string,uint256) foo,42 --quick');
    test.done();
};

exports['invoke with one argument'] = async function (test) {
    newaccount.execute([ 'alice' ]);   
    newaccount.execute([ 'contract' ]);   
    
    const config = configs.loadConfiguration();
    
    const cpath = path.join(__dirname, '..', 'contracts');
    const contract = require(path.join(cpath, 'build', 'contracts', 'Counter.json'));
    
    const client = {
        invoke: function (from, to, fn, args, options) {
            test.deepEqual(from, config.accounts.alice);
            test.equal(to, config.accounts.contract.address);
            test.deepEqual(options, {});
            test.equal(fn, "add(uint256)");
            test.deepEqual(args, [ 42 ]);
            
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
    
    invoke.useClient(client);
    
    const txr = await invoke.execute([ 'alice', 'contract', 'add(uint256)', "42" ]);
    
    test.ok(txr);
    test.deepEqual(txr, { status: '0x1' });
    
    test.done();
};
