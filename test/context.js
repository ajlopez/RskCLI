
const context = require('../lib/context');
const rskapi = require('rskapi');

exports['context exposes rskapi'] = function (test) {
    test.strictEqual(context.rskapi, rskapi);
};