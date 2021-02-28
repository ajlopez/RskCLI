
const accounts = require('../../lib/commands/haccounts');

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

exports['retrieve accounts'] = async function (test) {
    const client = {
        accounts: function () { return accs; }
    };
    
    accounts.useClient(client);
    
    const result = await accounts.execute([]);
    
    test.deepEqual(result, accs);
    test.done();
};
