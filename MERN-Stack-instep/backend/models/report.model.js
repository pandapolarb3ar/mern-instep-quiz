const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
  test: { type: String },
}, {
  timestamps: true,
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;