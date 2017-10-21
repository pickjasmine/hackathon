const express = require('express');
const app = express();
const got  = require('got');
const fs = require('fs');
const cheerio = require('cheerio');
const $ = cheerio.load(fs.readFileSync("./web-app/index.html"));
const token = "964c73e3-d289-4cb7-a895-e9ebd1305b1d";

app.set('port', 8080);
app.use(express.static('web-app'));
app.listen(8080, function() {
  console.log('Server started on port 8080!')
});

// TODO - Dynamic URL Creation
// Using a test query for now...

let github_url="https://jobs.github.com/positions.json?description=python&location=sf&full_time=true";

getJobs(github_url)
.then(sendEmail)
.catch((err) => {
  console.log("Oh no! Something went wrong!");
})

// TODO: Use Cheerio to Grab From Data
// keywords = description [in url]
// location = location [in url]
// job type = if full time, full_time=true [in url]

async function getJobs(url) {
  let json;
  let jobs = [];

  await got(github_url)
  .then(response => {
    let data = JSON.parse(response.body);
    for (let i = 0; i < data.length; i++) {
      jobs.push(data[i].title, data[i].company, data[i].location, data[i].url);
    }
  })
  return jobs;
}

async function sendEmail(json) {
  const result = await getJobs();

  await got.post("https://api.mixmax.com/v1/send", {
    headers: {
      "content-type": "application/json",
      "X-API-TOKEN": token
    },
    body: JSON.stringify({
      "message": {
        "to": "musikmann7448@gmail.com",
        "subject": "Job Listing",
        "html": "hey this is just a quick test"
      }
    })
  })
  .then(response => {
    console.log(response.statusCode);
  })
}
