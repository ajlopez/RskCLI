
const genericget = require('../genericget');

async function execute(args, opts) {
    return genericget.execute0('code', args, opts);
}

module.exports = {
    useClient: genericget.useClient,
    execute
};

