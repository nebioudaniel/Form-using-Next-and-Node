Form Submission Application

This is a simple web application built with Node.js and Express.js that allows users to submit a form with their name, email, and message. The submitted data is stored in a MongoDB database, and optionally, it can be enriched using the Clearbit API for additional information.

Prerequisites

Before running this application, ensure that you have the following installed:
- Node.js and npm
- MongoDB (for storing form submissions)
- Clearbit API key (if you want to enable data enrichment)

Installation

1. Clone this repository to your local machine:
   git clone <repository-url>
2. Navigate to the project directory:
   cd form-submission-app
3. Install dependencies:
   npm install
4. Set up environment variables:
   Create a .env file in the project root and add the following:
   MONGODB_URI=<your-mongodb-uri>
   CLEARBIT_API_KEY=<your-clearbit-api-key>
   Replace <your-mongodb-uri> with the connection URI for your MongoDB database, and <your-clearbit-api-key> with your Clearbit API key.

Usage

1. Start the server:
   npm start
2. Open your web browser and go to http://localhost:3000.
3. Fill out the form with your name, email, and message, then submit.
4. Optionally, check your MongoDB database for the stored form submissions.

Project Structure

- app.js: Main entry point of the application.
- routes/index.js: Handles routing for the application.
- controllers/formController.js: Logic for handling form submissions.
- services/clearbitService.js: Service for integrating with the Clearbit API.
- models/formSubmission.js: Defines the Mongoose model for storing form submissions.
- views/index.html: HTML file for the form submission page.

Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

License

This project is licensed under the MIT License - see the LICENSE.txt file for details.
