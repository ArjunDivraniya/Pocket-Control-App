const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const jwt = require('jsonwebtoken');

// Middleware (Same as before)
const protect = (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) { res.status(401).json({ message: 'Token failed' }); }
};

router.get('/', protect, async (req, res) => {
  const categories = await Category.find({ user: req.user });
  res.json(categories);
});

router.post('/', protect, async (req, res) => {
  const { name, icon, type, color } = req.body;
  const category = await Category.create({ user: req.user, name, icon, type, color });
  res.status(201).json(category);
});

router.delete('/:id', protect, async (req, res) => {
  await Category.findOneAndDelete({ _id: req.params.id, user: req.user });
  res.json({ message: 'Category removed' });
});

module.exports = router;