// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

function makeDate(date){
  const newDate = new Date(date);

  if(newDate == "Invalid Date"){
    return {error: "Invalid Date"}
  }

  return {
    unix: newDate.getTime(),
    utc: newDate.toUTCString()
  };
}

app.get("/api/whoami", function (req, res) {
  const ip = req.headers['x-forwarded-for'];
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];
  // console.log('req', req);
  res.json({'ipaddress': ip, 'language': language, 'software': software})
});

app.get("/api/:date([0-9]{4}[\/\-][0-9]{2}[\/\-][0-9]{2})", function (req, res) {
  res.json(makeDate(req.params.date))
})

app.get("/api/:date(\\d+)", function (req, res) {
  res.json(makeDate(Number(req.params.date, 10)))
})

app.get("/api/:date(*)", function (req, res) {
  if (!req.params.date){
    res.json(makeDate(new Date()))
  }
  res.json(makeDate(req.params.date));
})


// listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
var listener = app.listen('3006', function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
