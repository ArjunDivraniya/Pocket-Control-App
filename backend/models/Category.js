const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  icon: { type: String, required: true }, // Store emoji or icon name
  type: { type: String, enum: ['income', 'expense'], default: 'expense' },
  color: { type: String, default: '#7B61FF' }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);