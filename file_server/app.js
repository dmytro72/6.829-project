var express = require('express');
var app = express();
var path = require('path');

var curriedResponse = function(size) {
  return function(req, res) {
    var options = { 
      root: __dirname, 
      lastModified: false, 
      cacheControl: false,
      headers: {
        'Transfer-Encoding': 'identity',
        'Content-Encoding': 'identity'
      }
    };
    res.sendFile(size + 'kb.dat', options, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Sent file of size ' + size + ' kb!');
      }
    });
  }
};

app.get('/16', curriedResponse('16'));
app.get('/64', curriedResponse('64'));
app.get('/256', curriedResponse('256'));
app.get('/1024', curriedResponse('1024'));

app.listen(3000, function() {
  console.log('File server listening on port 3000');
});