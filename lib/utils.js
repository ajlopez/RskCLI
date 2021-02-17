
const BN = require('bn.js');

const maxdecdigits = Number.MAX_SAFE_INTEGER.toString(10).length;
const maxhexadigits = Number.MAX_SAFE_INTEGER.toString(16).length;

function getHexadecimalValue(value) {
    while (value[0] === '0' && value.length > 1)
        value = value.substring(1);
    
    if (value.length >= maxhexadigits)
        return new BN(value, 16).toString();
    
    return parseInt(value, 16);
}

function getValue(value) {
    if (typeof value !== 'string')
        return value;
    
    if (value.startsWith('0x'))
        return getHexadecimalValue(value.substring(2));
    
    while (value[0] === '0' && value.length > 1)
        value = value.substring(1);
    
    if (value.length >= maxdecdigits)
        return value;
    
    return parseInt(value);
}

function getAddress(config, name) {
    if (!config.accounts || !config.accounts[name])
        return null;
    
    const account = config.accounts[name];
    
    if (account.address)
        return account.address;
    
    return account;
}

function getAccount(config, name) {
    if (!config.accounts || !config.accounts[name])
        return null;
    
    return config.accounts[name];
}

function isZeroString(value) {
    for (let k = 0; k < value.length; k++)
        if (value[k] !== '0')
            return false;
        
    return true;
}

function removeRightZeros(value) {
    while (value[value.length - 1] === '0')
        value = value.substring(0, value.length - 1);
    
    if (value[value.length - 1] === '.')
        value = value.substring(0, value.length - 1);
    
    return value;
}

function withDecimals(value, decimals) {
    value = getValue(value).toString();
    
    if (isZeroString(value))
        return '0';
    
    if (decimals === 0)
        return value;
    
    while (value.length < decimals)
        value = '0' + value;
    
    if (value.length === decimals)
        return removeRightZeros('0.' + value);
    
    return removeRightZeros(value.substring(0, value.length - decimals) + '.' + value.substring(value.length - decimals));
}

module.exports = {
    getValue,
    getAddress,
    getAccount,
    withDecimals
}

