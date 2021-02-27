
const info = require('../../lib/commands/info');
const configs = require('../../lib/config');
const sethost = require('../../lib/commands/sethost');

exports['get host'] = async function (test) {
    sethost.execute([ 'http://localhost:4444' ]);
    const config = configs.loadConfiguration();
        
    const result = await info.execute([]);
    
    test.ok(result);
    test.deepEqual(result, { host: 'http://localhost:4444' });
    
    test.done();
};

