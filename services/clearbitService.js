const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

// Route to serve the index.html file
router.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/../views' });
});

// Route to handle form submission
router.post('/submit-form', formController.submitForm);

// Route to handle GET request for fetching form data
router.get('/get-form-data', formController.getFormData);

module.exports = router;
// exporting models in route;
