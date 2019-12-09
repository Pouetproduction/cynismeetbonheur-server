const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const express = require("express"),
	app = express(),
	port = process.env.PORT || 3000;



const messageRoutes = require("./api/routes/message");


app.use(cors()); // Cross-origin resource sharing
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(morgan("dev")); // DEBUGGER

const options = {
	server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
	replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
};

//URL de notre base
const mongoDB = "mongodb://127.0.0.1/cnb";

// Nous connectons l'API à notre base de données
mongoose.connect(mongoDB, options);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erreur lors de la connexion"));
db.once("open", function() {
	console.log("Connexion à la base OK");
});



// Routes which should handle requests
app.use("/message", messageRoutes);


app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(port);

console.log("C&B RESTful API server started on: " + port);
