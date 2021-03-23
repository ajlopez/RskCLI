
const genericget = require('../genericget');

async function execute(args, opts) {
    opts = opts || {};

    opts.values = [ 'size', 'gasLimit', 'gasUsed', 'timestamp', 'totalDifficulty', 'difficulty', 'number' ];

    return genericget.execute('block', args, opts);
}

module.exports = {
    useClient: genericget.useClient,
    execute
};

