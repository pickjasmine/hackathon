const express = require('express');
const got  = require('got');
const app = express();
const token = "964c73e3-d289-4cb7-a895-e9ebd1305b1d";

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});

<<<<<<< HEAD
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
=======
function getBody() {
  let emailBody;
  got("jsonplaceholder.typicode.com/posts/1")
  .then(response => {
    let data = JSON.parse(response.body);
    emailBody = data.title;
  })
  setTimeout(function() {
    got.post("https://api.mixmax.com/v1/send", {
      body: JSON.stringify({
        "message": {
          "to": "musikmann7448@gmail.com",
          "subject": "Job listing",
          "html": emailBody
        }
      }),
      headers: {
        "content-type": "application/json",
        "X-API-TOKEN": token
      }
    })
  }, 3000);
}

getBody();
>>>>>>> d39d03644aa3f2af8a757bb7543a0921a2523b26
