var express = require('express');
var path = require('path');
var webpack = require('webpack');
var app = express();

var static_path = __dirname;

app.use(express.static(static_path))
  .get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
  }).listen(process.env.PORT || 8000, function (err) {
    if (err) { console.log(err) };
    console.log(`Listening at 0.0.0.0:${process.env.PORT || 8000}`);
  });
