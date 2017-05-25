# json-ex

[![Build Status](https://travis-ci.org/gabrielcsapo/json-ex.svg?branch=master)](https://travis-ci.org/gabrielcsapo/json-ex)
[![Dependency Status](https://david-dm.org/gabrielcsapo/json-ex.svg)](https://david-dm.org/gabrielcsapo/json-ex)
[![devDependency Status](https://david-dm.org/gabrielcsapo/json-ex/dev-status.svg)](https://david-dm.org/gabrielcsapo/json-ex#info=devDependencies)
[![Coverage Status](https://node-coverage-server.herokuapp.com/badge/github%2Ecom/gabrielcsapo/json-ex.svg)](https://node-coverage-server.herokuapp.com/coverage/github%2Ecom/gabrielcsapo/json-ex)
[![npm](https://img.shields.io/npm/dt/json-ex.svg?maxAge=2592000)]()
[![npm](https://img.shields.io/npm/dm/json-ex.svg?maxAge=2592000)]()

> Extends JSON to  be able to serialize and deserialize more than just basic primitives

# What is this?

Let's parse JSON like it is 20**! Let's add support for functions, buffers, dates and the basic primitives! If you know of anymore let me know and let's add them!

> This is not a recreation of JSON, it is extending the protocol to allow for more types

# Install

```bash
npm install json-ex
```

## Usage

> json-ex is a drop in replacement for JSON, so it implements JSON.stringify and JSON.parse

### Stringify

```javascript
const JSONex = require('json-ex');
const object = {
    name: 'Hello world',
    person: true,
    age: 100000,
    buffer: new Buffer('hi'),
    date: new Date('10/20/2017'),
    func: function hello() { return 'hello world' },
    reg: new RegExp('%name%')
};
const output = JSONex.stringify(object);
```

#### output

```json
{
  "name": "Hello world",
  "person": true,
  "age": 100000,
  "buffer": "_BuffEx_{\"type\":\"Buffer\",\"data\":[104,105]}",
  "date": "_DateEx_${object.date.toISOString()}",
  "func": "function hello() { return \'hello world\' }",
  "reg": "_PxEgEr_/%name%/"
}
```

### Parse

```javascript
const string = `{
  "name": "Hello world",
  "person": true,
  "age": 100000,
  "buffer": "_BuffEx_{\"type\":\"Buffer\",\"data\":[104,105]}",
  "date": "_DateEx_2017-05-25T21:27:35.315Z",
  "func": "function hello() { return \'hello world\' }",
  "reg": "_PxEgEr_/%name%/"
}`
const output = JSONex.parse(string);
```

### output

```javascript
{
  name: 'Hello world',
  person: true,
  age: 100000,
  buffer: <Buffer 68 69>,
  date: Thu May 25 2017 14:27:35 GMT-0700 (PDT),
  func: [Function: hello],
  reg: /%name%/
}```

## Benchmark

> run benchmarks by running `npm run benchmark`

```bash
    json-ex
    89,066 op/s » Stringify
    131,959 op/s » Parse


    Suites:  1
    Benches: 2
    Elapsed: 2,328.64 ms
```
