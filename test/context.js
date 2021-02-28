
const context = require('../lib/context');
const rskapi = require('rskapi');
const utils = require('../lib/utils');
const configs = require('../lib/config');

const block = require('../lib/commands/block');

exports['context exposes rskapi'] = function (test) {
    test.strictEqual(context.rskapi, rskapi);
};

exports['context exposes utils'] = function (test) {
    test.strictEqual(context.utils, utils);
};

exports['context exposes configs'] = function (test) {
    test.strictEqual(context.configs, configs);
};

exports['context retrieves command'] = function (test) {
    test.strictEqual(context.command('block'), block);
};

exports['context require internal local module'] = function (test) {
    test.strictEqual(context.require('./config'), configs);
};

exports['context require dependency module'] = function (test) {
    test.strictEqual(context.require('simpleabi'), require('simpleabi'));
};

