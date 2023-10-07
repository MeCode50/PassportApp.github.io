const express = require('express');
const { ensureAuthenticated } = require('../config/auth');

// use the express router
const router = express.Router();

// create a router
router.get('/', (req, res) => res.render('welcome'));

// render the patient reg page 
router.get('/register-patient', ensureAuthenticated, (req, res) => {
  res.render('register-patient', {
    name: req.user.name // Pass the user object to the view
  });
});




module.exports = router;



