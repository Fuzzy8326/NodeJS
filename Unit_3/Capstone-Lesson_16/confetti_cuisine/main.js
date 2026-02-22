"use strict"; // Enables strict mode for better error checking and safer JavaScript

// ===== IMPORT DEPENDENCIES =====
const express = require("express"); // Web framework for Node.js
const app = express(); // Create an Express application instance

const errorController = require("./controllers/errorController"); // Handles errors
const homeController = require("./controllers/homeController"); // Handles home page routes
const layouts = require("express-ejs-layouts"); // Layout support for EJS templates
const mongoose = require("mongoose"); // MongoDB object modeling tool
const Subscriber = require("./models/subscriber"); // Subscriber model (MongoDB schema)
const subscriberController = require("./controllers/subscribersController"); // Handles subscriber routes

// ===== DATABASE CONNECTION =====

// Connect to MongoDB database called "confetti_cuisine"
mongoose.connect("mongodb://0.0.0.0:27017/confetti_cuisine",
  { useNewUrlParser: true }
);

// Store the connection reference
const db = mongoose.connection;

// Run this once the database successfully connects
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// ===== APPLICATION SETTINGS =====

// Set the port (use environment port if available, otherwise 3000)
app.set("port", process.env.PORT || 3000);

// Set EJS as the template/view engine
app.set("view engine", "ejs");

// ===== MIDDLEWARE =====

// Serve static files from the "public" folder (CSS, images, JS, etc.)
app.use(express.static("public"));

// Enable layout support for EJS
app.use(layouts);

// Parse URL-encoded form data (form submissions)
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Parse incoming JSON data
app.use(express.json());

// ===== ROUTES =====

// Home page route → renders index.ejs
app.get("/", homeController.index);

// Courses page route → renders courses.ejs
app.get("/courses", homeController.showCourses);

// Handle contact form submission
app.post("/contact", homeController.postedSignUpForm);

// Get all subscribers and render subscribers.ejs
app.get(
  "/subscribers",
  subscriberController.getAllSubscribers, // Middleware to fetch subscribers
  (req, res, next) => {
    // Render the subscribers page with data retrieved from database
    res.render("subscribers", { subscribers: req.data });
  }
);

// Display subscription/contact page
app.get("/contact", subscriberController.getSubscriptionPage);

// Save a new subscriber to the database
app.post("/subscribe", subscriberController.saveSubscriber);

// ===== ERROR HANDLING =====

// Handle 404 errors (resource not found)
app.use(errorController.respondNoResourceFound);

// Handle 500 internal server errors
app.use(errorController.respondInternalError);

// ===== START SERVER =====

// Start the server and listen on the specified port
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});