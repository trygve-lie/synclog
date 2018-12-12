# synclog

A synchronous logger for [AsyncHooks](https://nodejs.org/api/async_hooks.html).

[![Dependencies](https://img.shields.io/david/trygve-lie/synclog.svg?style=flat-square)](https://david-dm.org/trygve-lie/synclog)
[![Build Status](http://img.shields.io/travis/trygve-lie/synclog/master.svg?style=flat-square)](https://travis-ci.org/trygve-lie/synclog)
[![Greenkeeper badge](https://badges.greenkeeper.io/trygve-lie/synclog.svg?style=flat-square)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/trygve-lie/synclog/badge.svg?targetFile=package.json&style=flat-square)](https://snyk.io/test/github/trygve-lie/synclog?targetFile=package.json)

## Installation

```bash
$ npm install synclog
```

## Example

```js
const asyncHooks = require('async_hooks');
const SyncLog = require('synclog');

const log = new SyncLog();

const asyncHook = asyncHooks.createHook({
    init(asyncId, type, triggerAsyncId, resource) {
        log.info(asyncId, type, triggerAsyncId);
    },
}).enable();
```

## Description

Synclog is a synchronous logger initially made to be used to print inside AsyncHooks.

Printing to the console is an asynchronous operation using `console.log()` will cause
the AsyncHooks callbacks to be called. Using `console.log()` or similar asynchronous
operations inside an AsyncHooks callback function will thus cause an infinite recursion.
An easy solution to this when debugging is to use a synchronous logging operation which
will print to stdout and will not invoke AsyncHooks recursively because it is synchronous.
Synclog is such a synchronous logger.

When that is said; this logger can be used outside of AsyncHooks if you need a synchronous
logger. Just be carefull and know how bad synchronous operations in node.js can be.

## Constructor

Create a new SyncLog instance.

```js
const SyncLog = require('synclog');
const log = new SyncLog(options);
```

### options (optional)

An Object containing misc configuration. The following values can be provided:

 * **level** - `String` - What log level to output on. Can be `fatal`, `error`, `warn`, `info`, `debug` or `trace`. Default: `info`.

## API

The SyncLog instance have the following API:

 * fatal([args])
 * error([args])
 * warn([args])
 * info([args])
 * debug([args])
 * trace([args])

All argumens (`args`) is printed to console.

## Warning

This module is synchronous and will block the entire process during writing. You should
not use this module in any production environment or where high performance is required.
It will degrade your performance. Use this module only for debugging purposes when
needed.

## How to keep log statements without depending on this logger

As said, its not recommended using this library in production code. Though, one might
want to add log statements to your own code without having to depend on this module.
This module is compatible with [abslog](https://github.com/trygve-lie/abslog) making
it possible to put log statements in your AsyncHooks code and only pass in this logger
in cases where one are debugging.

Here is an example on how a `class` with an AsyncHook can abstract its logging away:

```js
const asyncHooks = require('async_hooks');
const abslog = require('abslog');

const MyHook = class MyHook {
    constructor (logger) {
        const log = abslog(logger);

        const asyncHook = asyncHooks.createHook({
            init(asyncId, type, triggerAsyncId, resource) {
                log.info(asyncId, type, triggerAsyncId);
            },
        }).enable();
    }
};
```

When using the above class, ex locally, one can provide this module as a logger:

```js
const MyHook = require('MyHook');
const SyncLog = require('synclog');

const hook = new MyHook(new SyncLog());
```

When not debugging, ex in production, one can use the same class without passing
in a logger at all:

```js
const MyHook = require('MyHook');

const hook = new MyHook();
```

## License

The MIT License (MIT)

Copyright (c) 2018 - Trygve Lie - post@trygve-lie.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
