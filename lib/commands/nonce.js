
const genericget = require('../genericget');

async function execute(args, opts) {
    return genericget.execute1('nonce', args, opts);
}

module.exports = {
    useClient: genericget.useClient,
    execute
};

