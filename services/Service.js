const FormSubmission = require('../models/formSubmission');
const clearbitService = require('../services/clearbitService');

/**
 * Handle form submission
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.submitForm = async (req, res) => {
    const { name, email, message } = req.body;
    try {
        // Create form submission
        const submission = await FormSubmission.create({ name, email, message });
        
        // Enrich data using Clearbit
        const enrichedData = await clearbitService.enrichData(email);

        // Handle enriched data as needed
        // For example, log it or save it to another database
        
        res.status(201).json({ success: true, message: 'Form submitted successfully!', data: submission });
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
