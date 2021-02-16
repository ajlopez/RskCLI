
const utils = require('../lib/utils');

exports['get value from string'] = function (test) {
    const result = utils.getValue('100000');
    
    test.ok(result);
    test.strictEqual(result, 100000);
};

exports['get value from hexa string'] = function (test) {
    const result = utils.getValue('0x100');
    
    test.ok(result);
    test.strictEqual(result, 256);
};

exports['get big value from string'] = function (test) {
    const result = utils.getValue('1000000000000000000000000000');
    
    test.ok(result);
    test.strictEqual(result, '1000000000000000000000000000');
};

exports['get big value from hexa string'] = function (test) {
    const result = utils.getValue('0x1000000000000000000000000000');
    
    test.ok(result);
    test.strictEqual(result, '0x1000000000000000000000000000');
};

exports['get value from long string'] = function (test) {
    const result = utils.getValue('0000000000000000000000000001');
    
    test.ok(result);
    test.strictEqual(result, 1);
};

exports['get value from long hexa string'] = function (test) {
    const result = utils.getValue('0x0000000000000000000000000001');
    
    test.ok(result);
    test.strictEqual(result, 1);
};
