const FormSubmission = require('../models/formSubmission');
const clearbitService = require('../services/clearbitService');

exports.submitForm = async (req, res) => {
    const { name, email, message } = req.body;
    try {
        // Create form submission
        const submission = await FormSubmission.create({ name, email, message });
        
        // Enrich data using Clearbit
        const enrichedData = await clearbitService.enrichData(email);

        // Handle enriched data as needed

        res.send('Form submitted successfully!');
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).send('Internal Server Error');
    }
};
