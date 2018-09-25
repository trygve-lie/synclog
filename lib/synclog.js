'use strict';

const util = require('util');
const fs = require('fs');

const _log = Symbol('_log');

const SyncLog = class SyncLog {
    constructor(enabled = true) {
        Object.defineProperty(this, 'enabled', {
            value: enabled,
        });
    }

    get [Symbol.toStringTag]() {
        return 'SyncLog';
    }

    [_log](...args) {
        if (this.enabled) {
            fs.writeSync(process.stdout.fd, `${util.format(...args)}\n`);
        }
    }

    fatal(...args) {
        this[_log](...args);
    }

    error(...args) {
        this[_log](...args);
    }

    warn(...args) {
        this[_log](...args);
    }

    info(...args) {
        this[_log](...args);
    }

    debug(...args) {
        this[_log](...args);
    }

    trace(...args) {
        this[_log](...args);
    }
};

module.exports = SyncLog;
