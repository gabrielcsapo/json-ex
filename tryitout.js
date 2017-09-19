module.exports = {
    "title": "json-ex",
    "description": "Parsing JSON like it is 2017",
    "source": "https://github.com/gabrielcsapo/json-ex",
    "body": [{
      type: "text",
      value: "> [`json-ex`](https://github.com/gabrielcsapo/json-ex) extends JSON to be able to serialize and deserialize more than just basic primitives"
    },{
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
    },{
      type: "code",
      title: "Decode",
      value: `
        var JSONex = require("json-ex");
        var output = JSONex.parse('{\"name\":\"Hello world\",\"person\":true,\"age\":100000,\"date\":\"_DateEx_2017-10-20T07:00:00.000Z\",\"func\":\"function hello() { return \\'hello world\\' }\",\"reg\":\"_PxEgEr_/%name%/\"}');
        console.log(output.func());
      `
    }],
    "externals": [
      "./docs/jsonex.require.js"
    ],
    "output": "./docs"
};
