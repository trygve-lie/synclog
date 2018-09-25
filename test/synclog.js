'use strict';

const tap = require('tap');
const SyncLog = require('../');

tap.test('SyncLog() - object type - should be SyncLog', (t) => {
    const log = new SyncLog();
    t.equal(Object.prototype.toString.call(log), '[object SyncLog]');
    t.end();
});

tap.test('SyncLog.*() - Object - should have "fatal", "error", "warn", "info", "debug" and "trace" methods', (t) => {
    const log = new SyncLog();
    t.type(log.fatal, 'function');
    t.type(log.error, 'function');
    t.type(log.warn, 'function');
    t.type(log.info, 'function');
    t.type(log.debug, 'function');
    t.type(log.trace, 'function');
    t.end();
});

tap.test('SyncLog.*() - Call "fatal", "error", "warn", "info", "debug" and "trace" methods - should return "undefined"', (t) => {
    const log = new SyncLog();
    t.type(log.fatal(), 'undefined');
    t.type(log.error(), 'undefined');
    t.type(log.warn(), 'undefined');
    t.type(log.info(), 'undefined');
    t.type(log.debug(), 'undefined');
    t.type(log.trace(), 'undefined');
    t.end();
});
