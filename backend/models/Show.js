const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
	show_id: { type: String, required: true, unique: true },
	type: { type: String, required: true },
	title: { type: String, required: true },
	director: String,
	cast: String,
	country: String,
	date_added: String,
	release_year: Number,
	rating: String,
	duration: String,
	listed_in: String,
	description: String,
});

module.exports = mongoose.model("Show", showSchema);
