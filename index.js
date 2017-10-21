const express = require('express');
const got  = require('got');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});

function test() {
  got("https://jsonplaceholder.typicode.com/posts/1")
    .then(response => {
      let result = JSON.parse(response.body)
      console.log(result.body);
    });
}

test();
