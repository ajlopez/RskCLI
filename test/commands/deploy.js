
const deploy = require('../../lib/commands/deploy');
const configs = require('../../lib/config');
const utils = require('../../lib/utils');
const newaccount = require('../../lib/commands/newaccount');

const path = require('path');

exports['deploy'] = async function (test) {
    newaccount.execute([ 'alice' ]);   
    
    const config = configs.loadConfiguration();
    
    const cpath = path.join(__dirname, '..', 'contracts');
    const contract = require(path.join(cpath, 'build', 'contracts', 'Counter.json'));
    
    const client = {
        deploy: function (from, bytecode, args, options) {
            test.deepEqual(from, config.accounts.alice);
            test.equal(bytecode, contract.bytecode);
            test.deepEqual(args, []);
            test.deepEqual(options, {});
            
            return '0x010203';
        },
        receipt: function (txhash, times) {
            test.equal(txhash, '0x010203');
            test.equal(times, 0);
            
            return {
                contractAddress: '0x040506',
                status: '0x1'
            }
        }
    };
    
    deploy.useClient(client);
    
    const caddress = await deploy.execute([ 'alice', 'counter', 'Counter', cpath ]);
    
    test.ok(caddress);
    test.equal(caddress, '0x040506');
    
    const newconfig = configs.loadConfiguration();
    
    test.deepEqual(newconfig.instances.counter, {
        address: '0x040506',
        contract: 'Counter'
    });
    
    test.done();
};
