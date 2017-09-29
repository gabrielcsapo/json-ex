module.exports = {
  title: "json-ex",
  description: "Parsing JSON like it is 2017",
  nav: {
    Source: "https://github.com/gabrielcsapo/json-ex"
  },
  options: {
    width: "90%"
  },
  body: [{
    type: "text",
    value: `
    <div style="text-align: center;">
      <blockquote style="width: auto;display: inline-block;">
        <p>
          <a href="https://github.com/gabrielcsapo/json-ex">
          <code>json-ex</code></a> extends JSON to be able to serialize and deserialize more than just basic primitives
        </p>
      </blockquote>
    </div>
    `
  }, {
    type: "code",
    title: "Encode",
    value: `
        var JSONex = require("json-ex");
        var output = JSONex.stringify({
            name: 'Hello world',
            person: true,
            age: 100000,
            date: new Date('10/20/2017'),
            func: function hello() { return 'hello world' },
            reg: new RegExp('%name%')
        });
        console.log(output);
      `
  }, {
    type: "code",
    title: "Decode",
    value: `
        var JSONex = require("json-ex");
        var output = JSONex.parse('{"name":"Hello world","person":true,"age":100000,"buffer":"_BuffEx_%7B%22type%22%3A%22Buffer%22%2C%22data%22%3A%5B104%2C105%5D%7D","date":"_DateEx_2017-10-20T07%3A00%3A00.000Z","func":"_FuncRa_function%20hello()%20%7B%20return%20&#39;hello%20world&#39;%20%7D","reg":"_PxEgEr_%5B%22%25name%25%22%2C%22%22%5D"}');
        console.log(output.func());
      `
  }],
  externals: [
    "./dist/jsonex.min.js"
  ],
  output: "./docs"
};
