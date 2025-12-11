const mongoose = require('mongoose');

const budgetSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true }, // Format: "MM-YYYY"
  spent: { type: Number, default: 0 }, // Cached spent amount for speed
}, { timestamps: true });

module.exports = mongoose.model('Budget', budgetSchema);
