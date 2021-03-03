
const estimate = require('../../lib/commands/estimate');
const configs = require('../../lib/config');
const utils = require('../../lib/utils');
const newaccount = require('../../lib/commands/newaccount');
const simpleabi = require('simpleabi');

const path = require('path');

exports['estimate invoke'] = async function (test) {
    newaccount.execute([ 'alice' ]);   
    newaccount.execute([ 'contract' ]);   
    
    const config = configs.loadConfiguration();
    
    const client = {
        estimate: function (from, to, fn, args, options) {
            test.deepEqual(from, config.accounts.alice);
            test.equal(to, config.accounts.contract.address);
            test.deepEqual(options, {});
            test.equal(fn, "bar(string,uint256)");
            test.deepEqual(args, [ 'foo', 42 ]);
            
            return 100000;
        }
    };
    
    estimate.useClient(client);
    
    const result = await estimate.execute([ 'invoke', 'alice', 'contract', 'bar(string,uint256)', "foo,42" ]);
    
    test.ok(result);
    test.deepEqual(result, 100000);
    
    test.done();
};

exports['estimate deploy'] = async function (test) {
    newaccount.execute([ 'alice' ]);   
    newaccount.execute([ 'contract' ]);   
    
    const config = configs.loadConfiguration();
    
    const cpath = path.join(__dirname, '..', 'contracts');
    const contract = require(path.join(cpath, 'build', 'contracts', 'Message.json'));

    const client = {
        estimate: function (from, to, fn, args, options) {
            test.deepEqual(from, config.accounts.alice);
            test.ok(!to);
            test.equal(fn, contract.bytecode);
            test.deepEqual(args, [ 'Hello' ]);
            test.deepEqual(options, { types: [ 'string' ]});
            
            return 100000;
        }
    };
    
    estimate.useClient(client);
    
    const result = await estimate.execute([ 'deploy', 'alice', 'message', 'Message', 'string', 'Hello', cpath ]);
    
    test.ok(result);
    test.deepEqual(result, 100000);
    
    test.done();
};

exports['estimate invalid type'] = async function (test) {
    newaccount.execute([ 'alice' ]);   
    newaccount.execute([ 'contract' ]);   
    
    const config = configs.loadConfiguration();
    
    
    const result = await estimate.execute([ 'foo', 'alice', 'contract', 'bar(string,uint256)', "foo,42" ]);
    
    test.deepEqual(result, {
        error: "Invalid type 'foo': it should be 'invoke' or 'deploy'"
    });

    test.done();
};
