
const context = require('../context');
const path = require('path');

async function execute(args) {
    const filename = path.resolve(args[0]);
    
    return await require(filename)(context, args);
}

module.exports = {
    execute
};

