const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  category: String,
  quantity: Number,
  available: Boolean,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', itemSchema);
