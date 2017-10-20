# json-ex

[![Build Status](https://travis-ci.org/gabrielcsapo/json-ex.svg?branch=master)](https://travis-ci.org/gabrielcsapo/json-ex)
[![Dependency Status](https://starbuck.gabrielcsapo.com/badge/github/gabrielcsapo/json-ex/status.svg)](https://starbuck.gabrielcsapo.com/github/gabrielcsapo/json-ex)
[![devDependency Status](https://starbuck.gabrielcsapo.com/badge/github/gabrielcsapo/json-ex/dev-status.svg)](https://starbuck.gabrielcsapo.com/github/gabrielcsapo/json-ex#info=devDependencies)
[![Coverage Status](https://lcov-server.gabrielcsapo.com/badge/github%2Ecom/gabrielcsapo/json-ex.svg)](https://lcov-server.gabrielcsapo.com/coverage/github%2Ecom/gabrielcsapo/json-ex)
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
  "buffer": "_BuffEx_%7B%22type%22%3A%22Buffer%22%2C%22data%22%3A%5B104%2C105%5D%7D",
  "date": "_DateEx_2017-10-20T07%3A00%3A00.000Z",
  "func": "_FuncRa_function%20hello()%20%7B%20return%20&#39;hello%20world&#39;%20%7D",
  "reg": "_PxEgEr_%5B%22%25name%25%22%2C%22%22%5D"
}
```

### Parse

```javascript
const string = `{
  "name": "Hello world",
  "person": true,
  "age": 100000,
  "buffer": "_BuffEx_%7B%22type%22%3A%22Buffer%22%2C%22data%22%3A%5B104%2C105%5D%7D",
  "date": "_DateEx_2017-10-20T07%3A00%3A00.000Z",
  "func": "_FuncRa_function%20hello()%20%7B%20return%20&#39;hello%20world&#39;%20%7D",
  "reg": "_PxEgEr_%5B%22%25name%25%22%2C%22%22%5D"
}`;
const output = JSONex.parse(string);
```

### output

```javascript
{ name: 'Hello world',
  person: true,
  age: 100000,
  buffer: <Buffer 68 69>,
  date: 2017-10-20T07:00:00.000Z,
  func: [Function: hello],
  reg: /%name%/
}
```

## Benchmark

> run benchmarks by running `npm run benchmark`

```bash
json-ex
  41,763 op/s » Stringify
 87,266 op/s » Parse


Suites:  1
Benches: 2
Elapsed: 1,760.74 ms
```
