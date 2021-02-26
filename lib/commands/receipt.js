
const genericget = require('../genericget');

async function execute(args, opts) {
    return genericget.execute('receipt', args, opts);
}

module.exports = {
    useClient: genericget.useClient,
    execute
};

