var buf = new Buffer('Simply Easy Learning');
var json = buf.toJSON(buf);

console.log(json);
console.log(new Buffer('i').toJSON());
