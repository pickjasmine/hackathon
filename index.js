const express = require('express');
const got  = require('got');
const app = express();
const token = "bcbf0854-97f5-4135-9224-d9a13a5b2dcf";

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.listen(8080, function() {
  console.log('Example app listening on port 8080!')
});

async function getJSON() {
  const result = await got("https://jsonplaceholder.typicode.com/posts/1")
  .then(response => {
    let data = JSON.parse(response.body);
    result = data.title;
    console.log(result);
    return result
  });
}

async function test() {
  const title = await getJSON();
  console.log(title);
  return got.post('https://api.mixmax.com/v1/send', {
    headers: {
      'content-type': "application/json",
      'X-API-TOKEN': token
    },
    body: JSON.stringify({
      "message": {
        "to": "musikmann7448@gmail.com",
        "subject": "This is a new test subject",
        "html": title
      }
    }),
  }
)
.then(response => {
  console.log(response.statusCode);
  })
}

test()
.catch(console.log);
