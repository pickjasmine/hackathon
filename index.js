const express = require('express');
const app = express();
const got  = require('got');
const fs = require('fs');
const parser = require('body-parser');
const mmtoken = "964c73e3-d289-4cb7-a895-e9ebd1305b1d";
const twilio = require('twilio');
const IncomingWebhook = require('@slack/client').IncomingWebhook;

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
      "X-API-TOKEN": mmtoken
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

function testSlack() {
  var WebClient = require('@slack/client').WebClient;
  // var jobList =
  var token = process.env.SLACK_API_TOKEN || 'xoxp-259705158691-259267103377-259294246432-dc346552b350bbca6f64aba3214fee43';
  var web = new WebClient(token);
  web.chat.postMessage('#joblistings', jobList, function(err, res) {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Message sent: ', res);
    }
  });
}


function testTwilio() {
 var client = new twilio('AC233d913b9e82ceafb883f93e451224d3', '78969c0e712aaedceb1c775c7c86d12d');
 client.messages.create({
   to: '+13312628169',
   from: '+13479675486',
   body: 'Hello from Twilio!'
 });
}
