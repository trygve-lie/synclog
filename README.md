# synclog

A synchronous logger for AsyncHooks.

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

## Constructor

Create a new SyncLog instance.

```js
const SyncLog = require('synclog');
const log = new SyncLog(options);
```

### options (optional)

An Object containing misc configuration. The following values can be provided:

 * **enable** - `boolean` - Enable / disable logging. Default: true.

## API

The SyncLog instance have the following API:

 * fatal(args)
 * error(args)
 * warn(args)
 * info(args)
 * debug(args)
 * trace(args)

All argumens (`args`) is printed to console.

## Warning

This module is synchronous and will block the entire process during writing. You should
not use this module in any production environment or where high performance is required.
It will degrade your performance. Use this module only for debugging purposes when
needed.

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
