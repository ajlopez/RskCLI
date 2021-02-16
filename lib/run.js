
const args = process.argv.slice(2);

console.dir(args);

try {
    // TODO check .. presence
    const command = require('./commands/' + args[0]);
    
    command.execute(args.slice(1));
}
finally {
}