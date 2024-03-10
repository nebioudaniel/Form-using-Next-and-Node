const FormSubmission = require('../models/formSubmission');
const clearbitService = require('../services/clearbitService');
const logger = require('../utils/logger');

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
        
        // Log form submission
        logger.info(`Form submitted: Name - ${name}, Email - ${email}, Message - ${message}`);
        
        // Enrich data using Clearbit
        const enrichedData = await clearbitService.enrichData(email);

        // Log enriched data
        logger.info('Enriched data:', enrichedData);

        // Save enriched data to another database or perform additional operations
        
        res.status(201).json({ success: true, message: 'Form submitted successfully!', data: submission, enrichedData });
    } catch (error) {
        logger.error('Error submitting form:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
