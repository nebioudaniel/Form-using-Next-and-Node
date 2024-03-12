const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

// Route to serve the index.html file
router.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/../views' });
});

// Route to handle form submission
router.post('/submit-form', formController.submitForm);

module.exports = router;
