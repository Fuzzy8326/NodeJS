// Import Mongoose (MongoDB object modeling tool)
const mongoose = require('mongoose');

// ===== SCHEMA CREATION =====
// Define the structure (blueprint) of a Subscriber document
const subscriberSchema = mongoose.Schema({

    // ===== SCHEMA PROPERTIES =====
    // Each property represents a field in the MongoDB document

    name: String,     // Subscriber's name (stored as text)
    email: String,    // Subscriber's email address (stored as text)
    zipCode: Number   // Subscriber's zip code (stored as a number)

});

// ===== MODEL CREATION =====
// Create a Mongoose model based on the schema
// "Subscriber" will map to a collection named "subscribers" in MongoDB
module.exports = mongoose.model("Subscriber", subscriberSchema);