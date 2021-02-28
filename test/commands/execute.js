
const execute = require('../../lib/commands/execute');

const path = require('path');

exports['execute file using context'] = async function (test) {
    const filename = path.join('test', 'dotask');
    
    const result = await execute.execute([ filename ]);
    
    test.strictEqual(result, true);
    
    test.done();
};

exports['execute file using context and arguments'] = async function (test) {
    const filename = path.join('test', 'dotaskargs');
    
    const result = await execute.execute([ filename, 'foo', 'bar' ]);
    
    test.strictEqual(result, true);
    
    test.done();
};

