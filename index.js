'use strict';

var express = require('express');
var request = require('request');
var apiServerHost = process.env.apiServerHost;

var idkey = process.env.idkey;
var apikey = process.env.apikey;
console.log('apikey', apikey);
console.log('idkey' , idkey);

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', function(req, res) {
  var url = apiServerHost + req.url;
  console.log(url);
  var headers = {
    'X-Yummly-App-ID': idkey,
    'X-Yummly-App-Key': apikey
  };

  console.log(headers);
  req.pipe(request({url:url, headers:headers})).pipe(res);
});

app.listen(process.env.PORT || 3000);
