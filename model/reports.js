const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  cmdtyName: {
    type: String,
    trim: true,
    required: true,
  },
  cmdtyID: {
    type: String,
    trim: true,
  },
  marketID: {
    type: String,
    trim: true,
  },
  marketName: {
    type: String,
    trim: true,
    required: true,
  },
  users: [String],
  priceUnit: {
    type: String,
    default: 'Kg',
  },
  price: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Reports', ReportSchema);
