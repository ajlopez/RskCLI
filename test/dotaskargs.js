
module.exports = async function (context, args) {
    if (context.configs === require('../lib/config') &&
        args[0].endsWith('dotaskargs') &&
        args[1] === 'foo' &&
        args[2] === 'bar')
        return true;
    else
        return false;
}