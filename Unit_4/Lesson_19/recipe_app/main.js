"use strict";

// ==========================
// Imports
// ==========================

// Core dependencies
const express = require("express");
const app = express();
const router = express.Router();
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

// Application controllers
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const subscriberController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController");
const coursesController = require("./controllers/coursesController");

// Mongoose model
const Subscriber = require("./models/subscriber");

// Use native ES6 promises with Mongoose
mongoose.Promise = global.Promise;


// ==========================
// Database Connection
// ==========================

// Connect to local MongoDB database named "recipe_db"
mongoose.connect("mongodb://0.0.0.0:27017/recipe_db", {
  useNewUrlParser: true,        // Use new MongoDB URL parser
  useUnifiedTopology: true     // Use new server discovery engine
});

// Store database connection reference
const db = mongoose.connection;

// Run once when the database connection is successfully opened
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});


// ==========================
// App Configuration
// ==========================

// Set application port (environment variable OR default 3000)
app.set("port", process.env.PORT || 3000);

// Set view engine to EJS for rendering templates
app.set("view engine", "ejs");


// ==========================
// Middleware
// ==========================

// Serve static files from "public" folder
router.use(express.static("public"));

// Enable EJS layout support
router.use(layouts);

// Parse URL-encoded data (form submissions)
router.use(express.urlencoded({ extended: false }));

// Parse incoming JSON requests
router.use(express.json());

// Custom middleware to log request paths
router.use(homeController.logRequestPaths);


// ==========================
// Routes
// ==========================

// -------- Home Routes --------

// Home page
router.get("/", homeController.index);

// Contact / subscription page
router.get("/contact", subscriberController.getSubscriptionPage);


// -------- User Routes --------

// List all users
router.get("/users", usersController.index, usersController.indexView);

// Show form to create new user
router.get("/users/new", usersController.new);

// Create user (POST request)
router.post(
  "/users/create",
  usersController.create,
  usersController.redirectView
);

// Show individual user by ID
router.get(
  "/users/:id",
  usersController.show,
  usersController.showView
);


// -------- Subscriber Routes --------

// Display all subscribers
router.get(
  "/subscribers",
  subscriberController.getAllSubscribers,
  (req, res, next) => {
    // Render subscribers view with data passed from controller
    res.render("subscribers", { subscribers: req.data });
  }
);

// Handle new subscription form submission
router.post("/subscribe", subscriberController.saveSubscriber);


// -------- Course Route --------

// Display courses page
router.get("/courses", homeController.showCourses);


// ==========================
// Error Handling
// ==========================

// Attach router to main app
app.use("/", router);

// Log errors
router.use(errorController.logErrors);

// Handle 404 - Resource Not Found
router.use(errorController.respondNoResourceFound);

// Handle 500 - Internal Server Error
router.use(errorController.respondInternalError);


// ==========================
// Server Start
// ==========================

// Start server and listen on defined port
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`);
});