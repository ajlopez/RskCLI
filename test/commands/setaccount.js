
const setaccount = require('../../lib/commands/setaccount');
const configs = require('../../lib/config');

const accs = [
  '0x4e16fc0dd89574d8958ec1851aa332dae3d9521d',
  '0xacf41292527644309da44489f07c3b2996db6fca',
  '0xbb8fa97e5bf9ab4f88fd4585994ac9a282b56369',
  '0x8f14fbd795ed9b546953f1b241474ff8d8a64358',
  '0x41ef8be35347cd3c383bf3eb7a8c77ef5ddd6e28',
  '0x26ebc07d905d44bfd817b38a5e9570c8efe29954',
  '0x262d5f46eaaa2e7250b98510abd08e8529e7dbe2',
  '0x8d33c60e10ae7ca189abc437f19b644fad2aa76e',
  '0x895a3b67087f63b0ca1d19026fbaf69e87457f6c',
  '0x54650c91f6cd0cf3fc784c87cb26180c26bfb1e8'
];

const account = {
    "privateKey": "0x6f381a30325494a9f89804911616efeedf638bc9b777dd32098e32a8d33d3b5a",
    "publicKey": "0xd3bec3a05fc449801ee8612d41a5afa65dddf793260021008e93e318740b483bb0a153bd877b8283bfb15616cb506d4e9dd9c93ed465bbf76727fb7f2c2414b3",
    "address": "0xb090408afb46eb0b27334deb8d674b4cc7de2d42"
};

exports['set account'] = async function (test) {
    const client = {
        accounts: function () { return accs; }
    };
    
    setaccount.useClient(client);
    
    const result = await setaccount.execute([ 'alice', '0' ]);
    
    test.equal(result, accs[0]);
    
    const config = configs.loadConfiguration();

    test.equal(config.accounts.alice, accs[0]);
    
    test.done();
};

exports['set account using address'] = async function (test) {
    const result = await setaccount.execute([ 'alice', accs[1] ]);
    
    test.equal(result, accs[1]);
    
    const config = configs.loadConfiguration();

    test.equal(config.accounts.alice, accs[1]);
    
    test.done();
};

exports['set account using private key'] = async function (test) {
    const result = await setaccount.execute([ 'alice', account.privateKey ]);
    
    test.deepEqual(result, account);
    
    const config = configs.loadConfiguration();

    test.deepEqual(config.accounts.alice, account);
    
    test.done();
};
