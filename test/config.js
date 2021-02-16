
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