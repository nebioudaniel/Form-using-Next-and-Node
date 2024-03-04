const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

// Serve index.html on GET request to '/'
router.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/../views' });
});

// Handle form submission on POST request to '/submit-form'
router.post('/submit-form', (req, res) => {
    // Access form data submitted by the client
    const { name, email, message } = req.body;

    // Additional validation if needed
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please fill out all fields.' });
    }

    // Call the controller function to handle form submission
    formController.submitForm(req, res);
});

module.exports = router;
