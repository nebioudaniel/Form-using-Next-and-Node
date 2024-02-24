const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

router.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/../views' });
});

router.post('/submit-form', formController.submitForm);

module.exports = router;
