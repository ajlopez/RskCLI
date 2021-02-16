
const ethutil = require('ethereumjs-util');
const configs = require('../config');

var utils = require('ethereumjs-util');

function generateRandomHexaByte() {
    let n = Math.floor(Math.random() * 255).toString(16);
    
    while (n.length < 2)
        n = '0' + n;
    
    return n;
}

function generateRandomPrivateKey() {
    let key;
    
    do {
        let keytxt = '';
        
        for (let k = 0; k < 32; k++)
            keytxt += generateRandomHexaByte();
        
        key = Buffer.from(keytxt, 'hex');
    }
    while (!ethutil.isValidPrivate(key));
    
    return key;
}

function generateAccount() {
    var privateKey = generateRandomPrivateKey();
    var publicKey = '0x' + ethutil.privateToPublic(privateKey).toString('hex');
    var address = '0x' + ethutil.privateToAddress(privateKey).toString('hex');
    
    if (!ethutil.isValidAddress(address))
        throw new Error('invalid address: ' + address);
    
    return {
        privateKey: '0x' + privateKey.toString('hex'),
        publicKey: publicKey,
        address: address
    }
}

function execute(args) {
    const name = args[0];
    const account = generateAccount();
    
    const config = configs.loadConfiguration();
    
    config.accounts[name] = account;
    
    configs.saveConfiguration(config);
    
    console.log('address', account.address);
}

module.exports = {
    execute
}

