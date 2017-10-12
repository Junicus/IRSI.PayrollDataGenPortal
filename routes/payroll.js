var express = require('express');
var zip = require('express-zip');
var router = express.Router();
var http = require('http');

var fs = require('fs');
var path = require('path');

var request = require('request');
var querystring = require('querystring');

router.get('/files', function (req, res) {
  fs.readdir(process.env.PAYROLL_FILES_PATH, function (err, files) {
    if (err) res.sendStatus(500);
    res.send({ files: files });
  });
});

router.get('/getFiles', function (req, res) {
  var files = req.query.files.split(',');
  var zipOptions = files.map(function (e) {
    return { path: path.join(process.env.PAYROLL_FILES_PATH, e), name: e }
  });
  console.log(zipOptions);
  res.zip(zipOptions, 'payroll.zip');
});

router.post('/', function (req, res) {
  const { startDate, endDate } = req.body;
  var headers = {
    'User-Agent': 'Super Agent/0.0.1',
    'Content-Type': 'application/json'
  };

  var options = {
    url: `${process.env.BASE_WCF_URL}/payrollGen`,
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ startDate: startDate, endDate: endDate })
  };

  console.log(options);

  request.post(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      res.sendStatus(500);
    }
  });
});

module.exports = router;
