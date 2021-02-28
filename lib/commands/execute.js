
const context = require('../context');
const path = require('path');

async function execute(args) {
    const originalArgs = args;
    const filename = path.resolve(args[0]);
    
    return await require(filename)(context, originalArgs);
}

module.exports = {
    execute
};

