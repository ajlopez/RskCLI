
const getconf = require('../../lib/commands/getconf');
const configs = require('../../lib/config');

exports['get configuration'] = async function (test) {
    const config = configs.loadConfiguration();
    
    config.random = Math.floor(Math.random() * 1000000);
    configs.putConfiguration(config, 'test');

    const config2 = configs.loadConfiguration();
    
    test.ok(config.random != config2.random);
    
    const result = await getconf.execute([ 'test' ]);
    
    const newconfig = configs.loadConfiguration();
    
    test.deepEqual(newconfig, config);
    test.deepEqual(newconfig, result);
    
    test.done();
};