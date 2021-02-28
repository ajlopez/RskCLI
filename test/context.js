
const context = require('../lib/context');
const rskapi = require('rskapi');
const utils = require('../lib/utils');

exports['context exposes rskapi'] = function (test) {
    test.strictEqual(context.rskapi, rskapi);
};

exports['context exposes utils'] = function (test) {
    test.strictEqual(context.utils, utils);
};

