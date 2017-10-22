const express = require('express');
const app = express();
const got  = require('got');
const fs = require('fs');
const parser = require('body-parser');
const token = "964c73e3-d289-4cb7-a895-e9ebd1305b1d";

app.set('port', 8080);
app.use(express.static('web-app'));
app.use(parser.json());
app.post('/submit', function(req, res) {
  res.send('success!')
  console.log(req.body);
})
app.listen(8080, function() {
  console.log('Server started on port 8080!')
});

// TODO - Dynamic URL Creation
// Using a test query for now...

let github_url="https://jobs.github.com/positions.json?description=python&location=sf&full_time=true";

// getJobs(github_url)
// .then(sendEmail)
// .catch((err) => {
//   console.log("Oh no! Something went wrong!");
//   console.log(err);
// })

async function getJobs(url) {
  let json;
  let jobs = [];
  let job;

  let response = await got(github_url)

  let data = JSON.parse(response.body);
  for (let i = 0; i < data.length; i++) {
    let { title, location, company, url } = data[i];
    jobs.push({
      title, location, company, url
    });
  }
  return jobs;
}

async function sendEmail(json) {
  const jobs = await getJobs();
  await got.post("https://api.mixmax.com/v1/send", {
    headers: {
      "content-type": "application/json",
      "X-API-TOKEN": token
    },
    body: JSON.stringify({
      "message": {
        "to": "musikmann7448@gmail.com",
        "subject": "Job Listing",
        "html": jobs.map(function(job) {
          return `${job.title} ${job.location} ${job.company} ${job.url}`
        }).join("<br/>")
      }
    })
  })
  .then(response => {
    console.log(response.statusCode);
  })
}
