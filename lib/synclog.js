'use strict';

const util = require('util');
const fs = require('fs');

const _log = Symbol('_log');

const levels = (level = 'info') => {
    let value = 3;
    switch (level.toLowerCase()) {
    case 'fatal':
        value = 0;
        break;
    case 'error':
        value = 1;
        break;
    case 'warn':
        value = 2;
        break;
    case 'info':
        value = 3;
        break;
    case 'debug':
        value = 4;
        break;
    case 'trace':
        value = 5;
        break;
    default:
        value = 3;
    }
    return value;
};

const SyncLog = class SyncLog {
    constructor(level = 'info') {
        Object.defineProperty(this, 'level', {
            value: levels(level),
        });
    }

    get [Symbol.toStringTag]() {
        return 'SyncLog';
    }

    [_log](level, str, ...args) {
        if (this.level >= level) {
            fs.writeSync(process.stdout.fd, `${str}: ${util.format(...args)}\n`);
        }
    }

    fatal(...args) {
        this[_log](0, 'fatal', ...args);
    }

    error(...args) {
        this[_log](1, 'error', ...args);
    }

    warn(...args) {
        this[_log](2, 'warn', ...args);
    }

    info(...args) {
        this[_log](3, 'info', ...args);
    }

    debug(...args) {
        this[_log](4, 'debug', ...args);
    }

    trace(...args) {
        this[_log](5, 'trace', ...args);
    }
};

module.exports = SyncLog;
