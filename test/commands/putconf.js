
const putconf = require('../../lib/commands/putconf');
const configs = require('../../lib/config');

exports['put configuration'] = async function (test) {
    const config = configs.loadConfiguration();
    
    config.random = Math.floor(Math.random() * 1000000);
    configs.saveConfiguration(config);
    
    const result = await putconf.execute([ 'test' ]);
    
    const newconfig = configs.loadConfiguration('rskcli-test.json');
    
    test.deepEqual(result, config);
    test.deepEqual(newconfig, config);
    
    test.done();
};

