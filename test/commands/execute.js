
const execute = require('../../lib/commands/execute');

const path = require('path');

exports['execute file'] = async function (test) {
    const filename = path.join('test', 'dotask');
    
    const result = await execute.execute([ filename ]);
    
    test.strictEqual(result, true);
    
    test.done();
};

