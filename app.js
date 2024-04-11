// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const app = express();

// Set up middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML file with contact form
app.get('/', (req, res) => {
    // Send HTML response with contact form
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact Form</title>
        </head>
        <body>
            <h2>Contact Form</h2>
            <form action="/submit-form" method="POST">
                <label for="name">Full Name</label>
                <input type="text" id="name" name="name" required>
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" required>
                <label for="message">Message</label>
                <textarea id="message" name="message" rows="4" required></textarea>
                <button type="submit">Submit</button>
            </form>
        </body>
        </html>
    `);
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/contactDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define contact schema and model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  sentAt: Date
});
const Contact = mongoose.model('Contact', contactSchema);

// Handle form submission
app.post('/submit-form', async (req, res) => {
    // Extract form data
    const { name, email, message } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).send('Invalid email format.');
    }

    try {
        // Save contact message to the database
        const newContact = new Contact({ name, email, message, sentAt: new Date() });
        await newContact.save();
        console.log('Contact saved to database:', newContact);

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
            from: `"${name}" <${email}>`,
            to: 'recipient@example.com',
            subject: 'New Message from Contact Form',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                // Log error and send response
                console.log('Error occurred:', error.message);
                res.status(500).send('An error occurred. Please try again later.');
            } else {
                // Log success and send response
                console.log('Message sent:', info.messageId);
                res.send('Form submitted successfully!');
            }
        });
    } catch (error) {
        console.error('Error saving contact to database:', error);
        res.status(500).send('An error occurred. Please try again later.');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
