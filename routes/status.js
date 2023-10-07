const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');



// GET route for the status page (list of patients)
router.get('/status', async (req, res) => {
    try {
        const patients = await Patient.find(); // Fetch patients from your database
        res.render('status', { patients }); // Render the 'status.ejs' view with the list of patients
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;