suite('json-ex', function () {
  var JSONex = require('../index');

  bench('Stringify', function() {
    const object = {
        name: 'Hello world',
        person: true,
        age: 100000,
        buffer: new Buffer('hi'),
        date: new Date('10/20/2017'),
        func: function hello() { return 'hello world' },
        reg: new RegExp('%name%')
    };
    JSONex.stringify(object);
  });

  bench('Parse', function() {
    const j = '{"name":"Hello world","person":true,"age":100000,"buffer":"_BuffEx_{\\"type\\":\\"Buffer\\",\\"data\\":[104,105]}","date":"_DateEx_2017-10-20T07:00:00.000Z","func":"_FuncRa_\\"function hello() { return \'hello world\' }\\"","reg":"_PxEgEr_/%name%/"}';
    JSONex.parse(j);
  });
});
