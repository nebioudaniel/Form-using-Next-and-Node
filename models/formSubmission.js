const FormSubmission = require('../models/formSubmission');

// Handle form submission
exports.submitForm = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Create a new formSubmission document
        const formSubmission = new FormSubmission({
            name,
            email,
            message
        });

        // Save the formSubmission document to the database
        await formSubmission.save();

        // Log the form submission
        console.log(`Received form submission:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);

        // Respond to the client
        res.send('Form submitted successfully!');
    } catch (error) {
        console.error('Error occurred while saving form submission:', error);
        res.status(500).send('An error occurred. Please try again later.');
    }
};
