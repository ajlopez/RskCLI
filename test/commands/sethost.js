
const sethost = require('../../lib/commands/sethost');
const configs = require('../../lib/config');

exports['set host'] = function (test) {
    const config = configs.loadConfiguration();
    
    delete config.host;
    
    configs.saveConfiguration(config);
    
    sethost.execute([ 'http://localhost:4444' ]);
    
    const newconfig = configs.loadConfiguration();
    
    test.ok(newconfig);
    test.equal(newconfig.host, 'http://localhost:4444');
};