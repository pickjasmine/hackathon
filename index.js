const express = require('express');
const got  = require('got');
const fs = require('fs');
const parser = require('body-parser');
const keys = require('./keys.json')
const IncomingWebhook = require('@slack/client').IncomingWebhook;
const WebClient = require('@slack/client').WebClient;
const twilio = require('twilio');
const app = express();

app.set('port', 8080);
app.use(express.static('web-app'));
app.use(parser.json());

app.post('/submit', function(req, res) {
  let url = "https://jobs.github.com/positions.json?description=";
  let data = req.body;
  let i = 1;

  // Assumes the following fields are provided
  let location = `${data.location}`;
  let job_type = data.jobType[0].toString();
  let keywords = data.keywords;

  if (keywords[0] != undefined) {
    url += keywords[0];
    while (i < keywords.length) {
      if (keywords[i] != undefined) {
        url += "+" + keywords[i];
        i++;
      }
    }
  }

  url+="&location=" + location

  if (data.jobType[0] == "fullTime") {
    url += "&full_time=true"
  }
  getJobs(url).then(function(result) {sendEmail(result)});
});

app.listen(8080, function() {
  console.log('Server started on port 8080!')
});

async function getJobs(url) {
  let json;
  let jobs = [];
  const response = await got(url);
  let data = JSON.parse(response.body);
  for (let i = 0; i < data.length; i++) {
    let { title, location, company, url } = data[i];
    jobs.push({
      title, location, company, url
    });
  }
  return jobs;
}

function sendEmail(json) {
  const jobs = json;
  got.post("https://api.mixmax.com/v1/send", {
    headers: {
      "content-type": "application/json",
      "X-API-TOKEN": keys.MIXMAX_API_KEY
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
  let token = keys.SLACK_API_TOKEN;
  let web = new WebClient(token);
  web.chat.postMessage('#joblistings', "test msg", function(err, res) {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Message sent: ', res);
    }
  });
}

function testTwilio() {
 let client = new twilio(keys.TWILIO_SID, keys.TWILIO_API_KEY);
 client.messages.create({
   to: '+13312628169',
   from: '+13479675486',
   body: 'Hello from Twilio!'
 });
}
