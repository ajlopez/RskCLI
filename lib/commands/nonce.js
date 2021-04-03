
const genericget = require('../genericget');
const utils = require('../utils');
const configs = require('../config');

async function execute(args, opts) {
    const config = configs.loadConfiguration();
    // TODO review argument position
    args[0] = utils.getAddress(config, args[0]);
    return genericget.execute1('nonce', args, opts);
}

module.exports = {
    useClient: genericget.useClient,
    execute
};

