
const genericget = require('../genericget');
const configs = require('../config');
const simpleargs = require('simpleargs');

async function execute(args, opts) {
    const config = configs.loadConfiguration();
    
    opts = opts || {};
    
    const sargs = simpleargs(args);
    
    if (!sargs._.length)
        opts.default = config.latest.transaction;
        
    opts.values = [ 'nonce', 'gas', 'gasPrice', 'value', 'blockNumber', 'transactionIndex' ];
        
    for (let k = 0; k < args.length; k++)
        if (args[k] === 'latest')
            args[k] = config.latest.transaction;
    
    return genericget.execute('transaction', args, opts);
}

module.exports = {
    useClient: genericget.useClient,
    execute
};

