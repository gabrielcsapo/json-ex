const test = require('tape');

const JSONex = require('../index');
const moment = require('moment');

test('json-ex', (t) => {
    t.plan(4);

    t.test('should be able to stringify a basic javascript object', (t) => {
        const object = {
            name: 'Hello world',
            person: true,
            age: 100000
        };
        const output = JSONex.stringify(object);
        t.deepEqual(output, '{"name":"Hello world","person":true,"age":100000}')
        t.end();
    });

    t.test('should be able to stringify a complex javascript object', (t) => {
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
        t.equal(output, `{"name":"Hello world","person":true,"age":100000,"buffer":"_BuffEx_{\\"type\\":\\"Buffer\\",\\"data\\":[104,105]}","date":"_DateEx_${object.date.toISOString()}","func":"_FuncRa_\\"function hello() { return \'hello world\' }\\"","reg":"_PxEgEr_/%name%/"}`);
        t.end();
    });

    t.test('should be able to parse a complex object', (t) => {
      const j = '{"name":"Hello world","person":true,"age":100000,"buffer":"_BuffEx_{\\"type\\":\\"Buffer\\",\\"data\\":[104,105]}","date":"_DateEx_2017-10-20T07:00:00.000Z","func":"_FuncRa_\\"function hello() { return \'hello world\' }\\"","reg":"_PxEgEr_/%name%/"}';
      const parsed = JSONex.parse(j);

      t.equal(parsed.date.constructor.name, 'Date');
      t.equal(parsed.buffer.constructor.name, 'Buffer');
      t.equal(parsed.reg.constructor.name, 'RegExp');
      t.equal(parsed.func.constructor.name, 'Function');

      t.end();
    });

    t.test('should be able to stringify a complex javascript object and parse it back', (t) => {
        const object = {
            name: 'Hello world',
            message: 'hi',
            person: true,
            age: 100000,
            buffer: new Buffer('hi'),
            date: new Date('10/20/2017'),
            func: function hello() { return 'hello world' },
            quickFunc: () => { return 'hello world' },
            reg: new RegExp('%name%'),
            moment
        };
        const output = JSONex.stringify(object);
        const parsed = JSONex.parse(output);

        t.equal(parsed.date.constructor.name, 'Date');
        t.equal(parsed.buffer.constructor.name, 'Buffer');
        t.equal(parsed.reg.constructor.name, 'RegExp');
        t.equal(parsed.quickFunc.constructor.name, 'Function');
        t.equal(parsed.func.constructor.name, 'Function');

        t.equal(parsed.func(), 'hello world');
        t.equal(parsed.quickFunc(), 'hello world');
        t.end();
    });
});
