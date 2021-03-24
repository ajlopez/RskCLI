
module.exports = async function (context, args) {
    if (context.configs === require('../lib/config') &&
        args[0] === 'foo' &&
        args[1] === 'bar')
        return true;
    else
        return false;
}