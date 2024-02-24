// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

// Set up middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML file with form
app.get('/', (req, res) => {
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

// Handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    // Here you can process the form submission, e.g., send an email, save to a database, etc.
    console.log(`Received form submission:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
    res.send('Form submitted successfully!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
