
const BN = require('bn.js');
const fs = require('fs');
const path = require('path');

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

function isDigit(ch) {
    return ch >= '0' && ch <= '9';
}

function getArgument(config, arg) {
    if (isDigit(arg[0]))
        return arg;
    
    if (arg[0] === '"' && arg[arg.length - 1] === '"')
        return arg.substring(1, arg.length - 1);
    
    if (arg[0] === "'" && arg[arg.length - 1] === "'")
        return arg.substring(1, arg.length - 1);
    
    const address = getAddress(config, arg);
    
    if (!address)
        return arg;
    
    return address;
}

function getArguments(config, args) {
    if (!args)
        return [];
    
    args = args.split(',');
    
    for (let n in args)
        args[n] = getArgument(config, args[n]);
    
    return args;
}

function getContract(name, dirpath) {
    const filename = path.join(dirpath, 'build', 'contracts', name + '.json');
    
    return JSON.parse(fs.readFileSync(filename).toString());
}

module.exports = {
    getValue,
    getAddress,
    getAccount,
    withDecimals,
    getArguments,
    getContract
}

