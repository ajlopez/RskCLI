
const call = require('../../lib/commands/call');
const configs = require('../../lib/config');
const utils = require('../../lib/utils');
const newaccount = require('../../lib/commands/newaccount');
const setinstance = require('../../lib/commands/setinstance');
const simpleabi = require('simpleabi');
const rskapi = require('rskapi');

const path = require('path');

exports['call'] = async function (test) {
    const initialConfig = configs.loadConfiguration();
    
    delete initialConfig.accounts.alice;
    delete initialConfig.accounts.contract;
    delete initialConfig.instances.contract;
    
    configs.saveConfiguration(initialConfig);
    
    newaccount.execute([ 'alice' ]);   
    setinstance.execute([ 'contract', rskapi.account().address ]);   
    
    const config = configs.loadConfiguration();
    
    const cpath = path.join(__dirname, '..', 'contracts');
    const contract = require(path.join(cpath, 'build', 'contracts', 'Counter.json'));
    
    const client = {
        call: function (from, to, fn, args, options) {
            test.deepEqual(from, config.accounts.alice.address);
            test.equal(to, config.instances.contract);
            test.deepEqual(options, {});
            test.equal(fn, "bar(string,uint256)");
            test.deepEqual(args, [ 'foo', 42 ]);
            
            return '0x010203';
        }
    };
    
    call.useClient(client);
    
    const result = await call.execute([ 'alice', 'contract', 'bar(string,uint256)', "foo,42" ]);
    
    test.ok(result);
    test.deepEqual(result, '0x010203');
    
    test.done();
};

exports['call from contract'] = async function (test) {
    const initialConfig = configs.loadConfiguration();
    
    delete initialConfig.accounts.alice;
    delete initialConfig.accounts.contract;
    delete initialConfig.instances.contract;
    
    configs.saveConfiguration(initialConfig);
    
    setinstance.execute([ 'sender', rskapi.account().address ]);   
    setinstance.execute([ 'contract', rskapi.account().address ]);   
    
    const config = configs.loadConfiguration();
    
    const cpath = path.join(__dirname, '..', 'contracts');
    const contract = require(path.join(cpath, 'build', 'contracts', 'Counter.json'));
    
    const client = {
        call: function (from, to, fn, args, options) {
            test.equal(from, config.instances.sender);
            test.equal(to, config.instances.contract);
            test.deepEqual(options, {});
            test.equal(fn, "bar(string,uint256)");
            test.deepEqual(args, [ 'foo', 42 ]);
            
            return '0x010203';
        }
    };
    
    call.useClient(client);
    
    const result = await call.execute([ 'sender', 'contract', 'bar(string,uint256)', "foo,42" ]);
    
    test.ok(result);    
    
    test.deepEqual(result, '0x010203');
    test.done();
};

exports['call with zero as argument'] = async function (test) {
    const initialConfig = configs.loadConfiguration();
    
    delete initialConfig.accounts.alice;
    delete initialConfig.accounts.contract;
    delete initialConfig.instances.contract;
    
    configs.saveConfiguration(initialConfig);

    newaccount.execute([ 'alice' ]);   
    newaccount.execute([ 'contract' ]);   
    
    const config = configs.loadConfiguration();
    
    const cpath = path.join(__dirname, '..', 'contracts');
    const contract = require(path.join(cpath, 'build', 'contracts', 'Counter.json'));
    
    const client = {
        call: function (from, to, fn, args, options) {
            test.deepEqual(from, config.accounts.alice.address);
            test.equal(to, config.accounts.contract.address);
            test.deepEqual(options, {});
            test.equal(fn, "bar(uint256)");
            test.deepEqual(args, [ 0 ]);
            
            return '0x010203';
        }
    };
    
    call.useClient(client);
    
    const result = await call.execute([ 'alice', 'contract', 'bar(uint256)', "0" ]);
    
    test.ok(result);
    test.deepEqual(result, '0x010203');
    
    test.done();
};

exports['call returning string'] = async function (test) {
    newaccount.execute([ 'alice' ]);   
    newaccount.execute([ 'contract' ]);   
    
    const config = configs.loadConfiguration();
    
    const cpath = path.join(__dirname, '..', 'contracts');
    const contract = require(path.join(cpath, 'build', 'contracts', 'Counter.json'));
    
    const client = {
        call: function (from, to, fn, args, options) {
            test.deepEqual(from, config.accounts.alice.address);
            test.equal(to, config.accounts.contract.address);
            test.deepEqual(options, {});
            test.equal(fn, "bar(string,uint256)");
            test.deepEqual(args, [ 'foo', 42 ]);
            
            return '0x' + simpleabi.encodeValues([ "hello" ]);
        }
    };
    
    call.useClient(client);
    
    const result = await call.execute([ 'alice', 'contract', 'bar(string,uint256)', "foo,42", 'string' ]);
    
    test.ok(result);
    test.deepEqual(result, 'hello');
    
    test.done();
};

exports['call returning bytes32'] = async function (test) {
    newaccount.execute([ 'alice' ]);   
    newaccount.execute([ 'contract' ]);   
    
    const config = configs.loadConfiguration();
    
    const cpath = path.join(__dirname, '..', 'contracts');
    const contract = require(path.join(cpath, 'build', 'contracts', 'Counter.json'));
    
    const client = {
        call: function (from, to, fn, args, options) {
            test.deepEqual(from, config.accounts.alice.address);
            test.equal(to, config.accounts.contract.address);
            test.deepEqual(options, {});
            test.equal(fn, "bar(string,uint256)");
            test.deepEqual(args, [ 'foo', 42 ]);
            
            return '0x123456789abcdef0123456789abcdef0123456789abcdef0' ;
        }
    };
    
    call.useClient(client);
    
    const result = await call.execute([ 'alice', 'contract', 'bar(string,uint256)', "foo,42", 'bytes32' ]);
    
    test.ok(result);
    test.deepEqual(result, '0x123456789abcdef0123456789abcdef0123456789abcdef0');
    
    test.done();
};

exports['call without arguments returning bytes32'] = async function (test) {
    newaccount.execute([ 'alice' ]);   
    newaccount.execute([ 'contract' ]);   
    
    const config = configs.loadConfiguration();
    
    const cpath = path.join(__dirname, '..', 'contracts');
    const contract = require(path.join(cpath, 'build', 'contracts', 'Counter.json'));
    
    const client = {
        call: function (from, to, fn, args, options) {
            test.deepEqual(from, config.accounts.alice.address);
            test.equal(to, config.accounts.contract.address);
            test.deepEqual(options, {});
            test.equal(fn, "bar()");
            test.deepEqual(args, []);
            
            return '0x123456789abcdef0123456789abcdef0123456789abcdef0' ;
        }
    };
    
    call.useClient(client);
    
    const result = await call.execute([ 'alice', 'contract', 'bar()', 'bytes32' ]);
    
    test.ok(result);
    test.deepEqual(result, '0x123456789abcdef0123456789abcdef0123456789abcdef0');
    
    test.done();
};

exports['call returning two integers'] = async function (test) {
    newaccount.execute([ 'alice' ]);   
    newaccount.execute([ 'contract' ]);   
    
    const config = configs.loadConfiguration();
    
    const cpath = path.join(__dirname, '..', 'contracts');
    const contract = require(path.join(cpath, 'build', 'contracts', 'Counter.json'));
    
    const client = {
        call: function (from, to, fn, args, options) {
            test.deepEqual(from, config.accounts.alice.address);
            test.equal(to, config.accounts.contract.address);
            test.deepEqual(options, {});
            test.equal(fn, "bar(string,uint256)");
            test.deepEqual(args, [ 'foo', 42 ]);
            
            return '0x' + simpleabi.encodeValues([ 1, 2 ]);
        }
    };
    
    call.useClient(client);
    
    const result = await call.execute([ 'alice', 'contract', 'bar(string,uint256)', "foo,42", 'uint256,uint256' ]);
    
    test.ok(result);
    test.deepEqual(result, [ 1, 2 ]);
    
    test.done();
};
