var Messages = require("./api/models/messages");
var cors = require("cors");
var mongoose = require("mongoose");

var express = require("express"),
	app = express(),
	port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Ces options sont recommandées par mLab pour une connexion à la base
var options = {
	server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
	replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
};

//URL de notre base
var mongoDB = "mongodb://127.0.0.1/cnb";

// Nous connectons l'API à notre base de données
mongoose.connect(mongoDB, options);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "Erreur lors de la connexion"));
db.once("open", function() {
	console.log("Connexion à la base OK");
});

app.get("/", function(req, res) {
	console.log("Get /");

	res.send("Hello World!");
	console.log('Sent "Hello World!"');
});

app.get("/message", function(req, res) {
	console.log("Get /message");

	Messages.find(function(err, messages) {
		if (err) return console.error(err);
		res.send(messages);
	});
});

app.post("/message", function(req, res) {
	if (req.body && req.body.message) {
		var message = new Messages({ message: req.body.message });
		message.save(function(err, mess) {
			if (err) res.status(500).send("Broken");
			else res.send();
		});
	} else {
		res.status(400).send("message mandatory")
	}
});

app.listen(port);

console.log("C&B RESTful API server started on: " + port);
