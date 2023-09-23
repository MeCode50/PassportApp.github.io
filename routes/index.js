const express = require('express');
const { ensureAuthenticated } = require('../config/auth');

// use the express router
const router = express.Router();

// create a router
router.get('/', (req, res) => res.render('welcome'));

// dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', {
    name: req.user.name // Pass the user object to the view
  });
});

module.exports = router;
