const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// POST route for patient registration
router.post('/register-patient', async (req, res) => {
    try {
        const { name, sex, age, dob, tests, referralDoctor } = req.body;

        // Create a new patient record
        const newPatient = new Patient({
            name,
            sex,
            age,
            dob,
            tests,
            referralDoctor,
        });

        // Save the patient record to the database
        await newPatient.save();

        // Redirect to the status page
        res.redirect('/status');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;
