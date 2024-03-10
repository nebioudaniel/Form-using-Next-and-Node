const FormSubmission = require('../models/formSubmission');
const nodemailer = require('nodemailer');

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

        // Send email notification
        await sendEmailNotification(name, email, message);

        // Respond to the client
        res.send('Form submitted successfully!');
    } catch (error) {
        console.error('Error occurred while saving form submission:', error);
        res.status(500).send('An error occurred. Please try again later.');
    }
};

// Function to send email notification
async function sendEmailNotification(name, email, message) {
    try {
        // Create a Nodemailer transporter object using SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.example.com',
            port: 587,
            secure: false,
            auth: {
                user: 'your_email@example.com',
                pass: 'your_password'
            }
        });

        // Set up email data
        let mailOptions = {
            from: '"Your Name" <your_email@example.com>',
            to: 'recipient@example.com',
            subject: 'New Message from Contact Form',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Email notification sent successfully!');
    } catch (error) {
        console.error('Error occurred while sending email notification:', error);
    }
}
