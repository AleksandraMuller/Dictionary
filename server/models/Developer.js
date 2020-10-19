import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const developerSchema = new Schema({
	name: String,
	link: String,
});

module.exports = mongoose.model('Developer', developerSchema);

// import mongoose from 'mongoose';

// export const Developer = mongoose.model('Developer', {
//   name: {
//     type: String,
//   },
//   link: {
//     type: String,
//   },
// });
