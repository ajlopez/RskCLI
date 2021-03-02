
const config = require('../lib/config');

exports['load default config'] = function (test) {
    const conf = config.loadConfiguration();
    
    test.ok(conf);
    test.ok(typeof conf === 'object');
    
    test.ok(conf.accounts);
    test.ok(typeof conf.accounts === 'object');
    
    test.ok(conf.instances);
    test.ok(typeof conf.instances === 'object');
    
    test.ok(conf.options)
    test.ok(typeof conf.options === 'object');
};

exports['put config'] = function (test) {
    const conf = config.loadConfiguration();
    
    conf.random = Math.floor(Math.random() * 1000000);
    
    config.putConfiguration(conf, 'test');
    
    const newconf = config.loadConfiguration('rskcli-test.json');
    
    test.ok(newconf)
    test.deepEqual(newconf, conf);
};

exports['put config with invalid name'] = function (test) {
    const conf = config.loadConfiguration();
    
    conf.random = Math.floor(Math.random() * 1000000);
    
    try {
        config.putConfiguration(conf, 'test.test');
        test.fail();
    }
    catch (ex) {
        test.equal(ex, 'Invalid configuration name');
    }
};

