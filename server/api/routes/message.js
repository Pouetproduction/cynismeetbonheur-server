const Messages = require("../models/messages");
const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
	Messages.find(function(err, messages) {
		if (err) return console.error(err);
		res.send(messages);
	});
});

router.post("/", function(req, res) {
	if (req.body && req.body.message) {
		let message = new Messages({
			message: req.body.message
		});
		message.save(function(err, mess) {
			if (err) res.status(500).send("Broken");
			else
				res.json({
					createdMessage: message
				});
		});
	} else {
		res.status(400).send("message mandatory");
	}
});

module.exports = router;
