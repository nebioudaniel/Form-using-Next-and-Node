const mongoose = require('mongoose');

// Define schema for form submissions
const formSubmissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Field is required
        trim: true // Removes whitespace from both ends of the string
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true, // Converts email to lowercase
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'] // Validates email format
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Sets default value to current date and time
    }
});

// Create model for form submissions
const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema);

// Export the model
module.exports = FormSubmission;
