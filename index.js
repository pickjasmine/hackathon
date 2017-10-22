const express = require('express');
const got  = require('got');
const fs = require('fs');
const parser = require('body-parser');
const keys = require('./keys.json');
const WebClient = require('@slack/client').WebClient;
const twilio = require('twilio');
const app = express();

app.set('port', 8080);
app.use(express.static('web-app'));
app.use(parser.json());

app.post('/submit', function(req, res) {
  let url = "https://jobs.github.com/positions.json?description=";
  let data = req.body;
  console.log(data);
  let i = 1;

  // Assumes the following fields are provided
  let location = `${data.location}`;
  let keywords = data.keywords;
  let email = `${data.email}`
  let phone = "+1" + data.phoneNumber
  let slack = "#" + data.slack

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

  if (email != undefined) {
    getJobs(url).then(function(result) {sendEmail(result, email)});
  }

  if (slack != undefined) {
    getJobs(url).then(function(result) {sendSlack(result, slack)});
  }

  if (phone != undefined) {
    getJobs(url).then(function(result) {sendTwilio(result, phone)});
  }
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

function sendEmail(json, email) {
  const jobs = json;
  got.post("https://api.mixmax.com/v1/send", {
    headers: {
      "content-type": "application/json",
      "X-API-TOKEN": keys.MIXMAX_API_KEY
    },
    body: JSON.stringify({
      "message": {
        "to": email,
        "subject": "Job Listings 4 U!",
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

function sendSlack(json, slack) {
  let token = keys.SLACK_API_TOKEN;
  let web = new WebClient(token);
  let jobs = json;
  let messageText = JSON.stringify(jobs.map(function(job) {
    return ` ${job.title}, ${job.location}, ${job.company}, ${job.url}  `
  }) + '');
  console.log(slack);
  console.log(json);
  web.chat.postMessage(slack, messageText, function(err, res) {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Message sent')
    }
  });
}

function sendTwilio(json, phone) {
  let client = new twilio(keys.TWILIO_SID, keys.TWILIO_API_KEY);
  client.messages.create({
    to: phone,
    from: '+13479675486',
    body: 'Hello from Twilio!'
  });
}
