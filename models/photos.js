//models/photo.js

var mongoose = require('mongoose');
//Schema is a native mongoose method for arranging the data
var Schema = mongoose.Schema;

//sets up a universal schema for our data
var photoSchema = new Schema({
	make: String,
	model: String,
	year: Number,
	msrp: Number,
	image: String
})

//Uses the photos collection
module.exports = mongoose.model('photos', photoSchema);

