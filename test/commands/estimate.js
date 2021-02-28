
const estimate = require('../../lib/commands/estimate');
const configs = require('../../lib/config');
const utils = require('../../lib/utils');
const newaccount = require('../../lib/commands/newaccount');
const simpleabi = require('simpleabi');

const path = require('path');

exports['estimate'] = async function (test) {
    newaccount.execute([ 'alice' ]);   
    newaccount.execute([ 'contract' ]);   
    
    const config = configs.loadConfiguration();
    
    const cpath = path.join(__dirname, '..', 'contracts');
    const contract = require(path.join(cpath, 'build', 'contracts', 'Counter.json'));
    
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
    
    const result = await estimate.execute([ 'alice', 'contract', 'bar(string,uint256)', "foo,42" ]);
    
    test.ok(result);
    test.deepEqual(result, 100000);
    
    test.done();
};
