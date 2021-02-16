
const maxdecdigits = Number.MAX_SAFE_INTEGER.toString(10).length;
const maxhexadigits = Number.MAX_SAFE_INTEGER.toString(16).length;

function getHexadecimalValue(value) {
    while (value[0] === '0' && value.length > 1)
        value = value.substring(1);
    
    if (value.length >= maxdecdigits)
        return '0x' + value;
    
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

module.exports = {
    getValue,
    getAddress,
    getAccount
}

