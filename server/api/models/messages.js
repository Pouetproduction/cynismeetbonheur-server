var mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({
	message: String
}, {
    versionKey: false
});

var Messages = mongoose.model("Messages", messageSchema);

module.exports = Messages;
