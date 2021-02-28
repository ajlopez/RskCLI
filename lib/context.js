
const rskapi = require('rskapi');
const utils = require('./utils');
const configs = require('./config');

const path = require('path');

function command(name) {
    return require('./commands/' + name);
}

function localRequire(name) {
    return require(name);
}

module.exports = {
    rskapi,
    utils,
    configs,
    command,
    require: localRequire
};