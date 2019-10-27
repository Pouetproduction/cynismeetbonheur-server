var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.get('/', function (req, res) {
	console.log('Get /')
  	res.send('Hello World!')
	console.log('Sent "Hello World!"')
})

app.listen(port);

console.log('C&B RESTful API server started on: ' + port);