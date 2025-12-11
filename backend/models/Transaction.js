const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  type: { type: String, required: true, enum: ['income', 'expense'] },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  paymentMethod: { type: String, enum: ['Cash', 'UPI', 'Card'], default: 'Cash' },
  date: { type: Date, default: Date.now },
  note: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);