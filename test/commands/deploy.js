
const deploy = require('../../lib/commands/deploy');
const configs = require('../../lib/config');
const utils = require('../../lib/utils');
const newaccount = require('../../lib/commands/newaccount');
const simpleabi = require('simpleabi');

const path = require('path');

exports['deploy'] = async function (test) {
    newaccount.execute([ 'alice' ]);   
    
    const config = configs.loadConfiguration();
    
    const cpath = path.join(__dirname, '..', 'contracts');
    const contract = require(path.join(cpath, 'build', 'contracts', 'Counter.json'));
    
    const client = {
        deploy: function (from, bytecode, args, options) {
            test.deepEqual(from, config.accounts.alice);
            test.deepEqual(options, {});
            test.deepEqual(args, []);
            test.equal(bytecode, contract.bytecode);
            
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

exports['deploy with constructor types and arguments'] = async function (test) {
    newaccount.execute([ 'alice' ]);   
    
    const config = configs.loadConfiguration();
    
    const cpath = path.join(__dirname, '..', 'contracts');
    const contract = require(path.join(cpath, 'build', 'contracts', 'Message.json'));
    
    const client = {
        deploy: function (from, bytecode, args, options) {
            test.deepEqual(from, config.accounts.alice);
            test.deepEqual(args, [ 'Hello' ]);
            test.deepEqual(options, { types: [ 'string' ]});
            test.equal(bytecode, contract.bytecode);
            
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
    
    const caddress = await deploy.execute([ 'alice', 'message', 'Message', 'string', 'Hello', cpath ]);
    
    test.ok(caddress);
    test.equal(caddress, '0x040506');
    
    const newconfig = configs.loadConfiguration();
    
    test.deepEqual(newconfig.instances.counter, {
        address: '0x040506',
        contract: 'Counter'
    });
    
    test.done();
};
exports['deploy with gas in options'] = async function (test) {
    newaccount.execute([ 'alice' ]);   
    
    const config = configs.loadConfiguration();
    
    const cpath = path.join(__dirname, '..', 'contracts');
    const contract = require(path.join(cpath, 'build', 'contracts', 'Counter.json'));
    
    const client = {
        deploy: function (from, bytecode, args, options) {
            test.deepEqual(from, config.accounts.alice);
            test.equal(bytecode, contract.bytecode);
            test.deepEqual(args, []);
            test.deepEqual(options, { gas: 100000 });
            
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
    
    const caddress = await deploy.execute([ 'alice', 'counter', 'Counter', cpath, '-g', 100000 ]);
    
    test.ok(caddress);
    test.equal(caddress, '0x040506');
    
    const newconfig = configs.loadConfiguration();
    
    test.deepEqual(newconfig.instances.counter, {
        address: '0x040506',
        contract: 'Counter'
    });
    
    test.done();
};

exports['deploy with gas price in options'] = async function (test) {
    newaccount.execute([ 'alice' ]);   
    
    const config = configs.loadConfiguration();
    
    const cpath = path.join(__dirname, '..', 'contracts');
    const contract = require(path.join(cpath, 'build', 'contracts', 'Counter.json'));
    
    const client = {
        deploy: function (from, bytecode, args, options) {
            test.deepEqual(from, config.accounts.alice);
            test.equal(bytecode, contract.bytecode);
            test.deepEqual(args, []);
            test.deepEqual(options, { gasPrice: 100000 });
            
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
    
    const caddress = await deploy.execute([ 'alice', 'counter', 'Counter', cpath, '-gp', 100000 ]);
    
    test.ok(caddress);
    test.equal(caddress, '0x040506');
    
    const newconfig = configs.loadConfiguration();
    
    test.deepEqual(newconfig.instances.counter, {
        address: '0x040506',
        contract: 'Counter'
    });
    
    test.done();
};

exports['deploy with value in options'] = async function (test) {
    newaccount.execute([ 'alice' ]);   
    
    const config = configs.loadConfiguration();
    
    const cpath = path.join(__dirname, '..', 'contracts');
    const contract = require(path.join(cpath, 'build', 'contracts', 'Counter.json'));
    
    const client = {
        deploy: function (from, bytecode, args, options) {
            test.deepEqual(from, config.accounts.alice);
            test.equal(bytecode, contract.bytecode);
            test.deepEqual(args, []);
            test.deepEqual(options, { value: 100000 });
            
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
    
    const caddress = await deploy.execute([ 'alice', 'counter', 'Counter', cpath, '-v', 100000 ]);
    
    test.ok(caddress);
    test.equal(caddress, '0x040506');
    
    const newconfig = configs.loadConfiguration();
    
    test.deepEqual(newconfig.instances.counter, {
        address: '0x040506',
        contract: 'Counter'
    });
    
    test.done();
};

