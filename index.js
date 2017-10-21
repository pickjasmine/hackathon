const express = require('express');
const got  = require('got');
const app = express();
const token = "bcbf0854-97f5-4135-9224-d9a13a5b2dcf";

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});

function test() {
  return got.post('https://api.mixmax.com/v1/send',{
    body: JSON.stringify({

      "message": {
        "to": "musikmann7448@gmail.com",
        "subject": "This is my subject",
        "html" : "test"
      }
    }),
      headers: {
        'content-type': "application/json",
        'X-API-TOKEN': token
      }
    }
  )
}
/*.then(response => {
let result = JSON.parse(response.body)
console.log(result.body);
});
}
*/
test().catch(console.log);
