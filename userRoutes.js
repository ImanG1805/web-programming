const express = require('express');
const User = require('../models/user'); 
const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const [users] = await User.getUsers();  
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

router.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await User.createUser(name, email, password);
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

module.exports = router;
