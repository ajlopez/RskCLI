#!/usr/bin/env node

const args = process.argv.slice(2);

(async function() {
try {
    // TODO check .. presence
    const command = require('./commands/' + args[0]);
    
    await command.execute(args.slice(1), { verbose: true });
}
catch (ex) {
    if (ex.message)
        console.log("error:", ex.message);
    else
        console.log("error:", ex);    
}
})();

