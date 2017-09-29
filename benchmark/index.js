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
    JSONex.parse(`{"name":"Hello world","person":true,"age":100000,"buffer":"_BuffEx_%7B%22type%22%3A%22Buffer%22%2C%22data%22%3A%5B104%2C105%5D%7D","date":"_DateEx_2017-10-20T07%3A00%3A00.000Z","func":"_FuncRa_function%20hello()%20%7B%20return%20'hello%20world'%20%7D","reg":"_PxEgEr_%5B%22%25name%25%22%2C%22%22%5D"}`);
  });
});
