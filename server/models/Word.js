import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const wordSchema = new Schema({
	name: String,
	description: String,

	developerId: String,
});

module.exports = mongoose.model('Word', wordSchema);
