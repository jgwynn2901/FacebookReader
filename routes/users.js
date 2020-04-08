const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require ('config');
const User = require('../middleware/User');
const { check, validationResult } = require('express-validator');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/',[
  check('name','Please add name')
    .not()
    .isEmpty(),
  check('email','Please include valid email').isEmail(),
  check('password','Please enter a password with 6 or more characters')
    .isLength({min: 6})
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
  }
  
  const { name, email, password } = req.body;
  try {  
    await User.getUserByEmail(email, (result) => {
      if (result) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      const user = { name, email, password };
      const salt = bcrypt.genSalt(10);
      user.password = bcrypt.hash(password, salt);
      User.createUser(user, (result, err) => {
        if (err) {
          console.error(err.stack);
          res.status(500).send('Server Error');
        }
        else
          res.json(result);
      });
    });
  } catch (error) {
    console.error(error.msg);
    res.status(500).send('Server Error');
  }; 
});

// @route   GET api/users
// @desc    return list of users
// @access  Public
router.get('/', async (req, res) => {
  try {
    console.log('Calling getUsers()');
    await User.getUsers((results) => {
      res.json(results);
    });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/users/:email
// @desc    get user by email address
// @access  Public
router.get('/:email', async (req, res) => {
  try {
    User.getUserByEmail(req.params.email, (results) => {
      res.json(results);
    });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/contacts/:id
// @desc      Delete contact
// @access    Public
router.delete('/:id', async (req, res) => {
  try {
    User.findById(req.params.id, (user) => {
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      User.deleteUser(req.params.id, (msg, err) => {
        if(err) {
          return res.status(400).json(err);
        }
        res.json({ msg: 'User removed' });
      });
    });

    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;