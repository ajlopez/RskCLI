
const genericget = require('../genericget');

async function execute(args, opts) {
    opts = opts || {};

    opts.values = [ 'blockNumber', 'gasUsed', 'cummulativeGasUsed' ];
    
    return genericget.execute('receipt', args, opts);
}

module.exports = {
    useClient: genericget.useClient,
    execute
};

