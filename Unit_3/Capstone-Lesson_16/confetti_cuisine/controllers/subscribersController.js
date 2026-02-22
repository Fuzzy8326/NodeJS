// Import the Subscriber model (represents the subscribers collection in MongoDB)
const Subscriber = require('../models/subscriber');

// ===== GET ALL SUBSCRIBERS =====
// Retrieves all subscriber documents from the database
exports.getAllSubscribers = (req, res) => {

    // Find all documents in the subscribers collection
    Subscriber.find({})
        .exec() // Execute the query (returns a Promise)
        .then((subscribers) => {

            // Render the "subscribers" view and pass the retrieved data
            res.render("subscribers", {
                subscribers: subscribers
            });

        })
        .catch((error) => {

            // Log error message if something goes wrong
            console.log(error.message);

            // Return empty array to keep promise chain alive
            return [];
        })
        .then(() => {

            // This runs after either success or failure
            console.log("Promise Complete");

        });
};

// ===== SHOW SUBSCRIPTION PAGE =====
// Renders the contact/subscription form page
exports.getSubscriptionPage = (req, res) => {
    res.render("contact");
};

// ===== SAVE NEW SUBSCRIBER =====
// Handles form submission and saves a new subscriber to the database
exports.saveSubscriber = (req, res) => {

    // Create a new Subscriber object using form data
    let newSubscriber = new Subscriber({
        name: req.body.name,        // Subscriber name from form
        email: req.body.email,      // Subscriber email from form
        zipCode: req.body.zipCode   // Subscriber zip code from form
    });

    // Save the new subscriber to MongoDB
    newSubscriber.save()
        .then((result) => {

            // After successful save, render the "thanks" page
            res.render("thanks");

        })
        .catch((error) => {

            // If there is an error, send it back in the response
            res.send(error);

        });
};