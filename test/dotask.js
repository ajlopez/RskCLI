
module.exports = async function (context) {
    if (context.configs === require('../lib/config'))
        return true;
    else
        return false;
}