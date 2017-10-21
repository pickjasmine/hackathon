const express = require('express');
const got  = require('got');
const app = express();
const token = "964c73e3-d289-4cb7-a895-e9ebd1305b1d";

app.set('port', 8080);

app.use(express.static('web-app'));

app.listen(8080, function() {
  console.log('Server started on port 8080!')
});

// TODO - Dynamic URL Creation
// Using a test query for now...

let github_url="https://jobs.github.com/positions.json?description=python&location=sf&full_time=true";

getJobs(github_url);

function getJobs(url) {
  let json;
  let jobs = [];
  got(github_url)
  .then(response => {
    let data = JSON.parse(response.body);
    console.log(data.length);
    for (let i = 0; i < data.length; i++) {
      // jobs.push(data[i].title);
      // jobs.push(data[i].location);
      // jobs.push(data[i].company);
      // jobs.push(data[i].url);
      // console.log(jobs);
    }
  })
  // console.log(jobs);
  // return jobs;
}

//   async function sendEmail() {
//     const result = await getBody();
//   }
//     got.post("https://api.mixmax.com/v1/send", {
//       body: JSON.stringify({
//         "message": {
//           "to": "musikmann7448@gmail.com",
//           "subject": "Job listing",
//           "html": emailBody
//         }
//       }),
//       headers: {
//         "content-type": "application/json",
//         "X-API-TOKEN": token
//       }
//     })
//   }, 3000);
// }
