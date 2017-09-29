const test = require('tape');

const { decode, encode } = require('../../lib/util');

test('@util', (t) => {
  t.plan(2);

  t.test('@encode', (t) => {
    t.plan(1);

    t.test('encode function', (t) => {
      t.equal(encode("function hello() { return 'hello world' }"), 'function%20hello()%20%7B%20return%20&#39;hello%20world&#39;%20%7D');
      t.end();
    });

  });

  t.test('@decode', (t) => {
    t.plan(1);

    t.test('encode function', (t) => {
      t.equal(decode("function%20hello()%20%7B%20return%20&#39;hello%20world&#39;%20%7D"), "function hello() { return 'hello world' }");
      t.end();
    });

  });

});
