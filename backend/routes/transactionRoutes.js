const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const jwt = require('jsonwebtoken');

// Middleware to protect routes
const protect = (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token failed' });
  }
};

// @route GET /api/transactions
// @desc Get all transactions for the logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route POST /api/transactions
// @desc Add a new transaction
router.post('/', protect, async (req, res) => {
  const { type, amount, category, paymentMethod, date, note } = req.body;
  try {
    const transaction = await Transaction.create({
      user: req.user,
      type,
      amount,
      category,
      paymentMethod,
      date,
      note
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add transaction' });
  }
});

// @route GET /api/transactions/dashboard
// @desc Get total balance, income, and expense
router.get('/dashboard', protect, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user });
    
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, item) => acc + item.amount, 0);
      
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, item) => acc + item.amount, 0);

    const balance = income - expense;

    res.json({ income, expense, balance });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
