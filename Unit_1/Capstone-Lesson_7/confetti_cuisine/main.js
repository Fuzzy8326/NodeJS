"use strict";

// Import required Node.js modules and custom utilities
const port = 3000,
    http = require("http"),                    // Core HTTP module for creating server
    httpStatus = require("http-status-codes"), // HTTP status code constants
    router = require("./router"),              // Custom routing module
    contentTypes = require("./contentTypes"),  // MIME type definitions
    utils = require("./utils");                // Utility functions (like getFile)

// Route: Home page
// Handles GET requests to the root URL "/"
router.get("/", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/index.html", res);
});

// Route: Courses page
// Handles GET requests to "/courses.html"
router.get("/courses.html", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/courses.html", res);
});

// Route: Contact page
// Handles GET requests to "/contact.html"
router.get("/contact.html", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/contact.html", res);
});

// Route: Form submission handler
// Handles POST requests to "/" (likely from a form submission)
// Displays a thank you page after form is submitted
router.post("/", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/thanks.html", res);
});

// Route: Graph image
// Serves the graph.png image file
router.get("/graph.png", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.png);
    utils.getFile("public/images/graph.png", res);
});

// Route: People image
// Serves the people.jpg image file
router.get("/people.jpg", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.jpg);
    utils.getFile("public/images/people.jpg", res);
});

// Route: Product image
// Serves the product.jpg image file
router.get("/product.jpg", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.jpg);
    utils.getFile("public/images/product.jpg", res);
});

// Route: Custom CSS file
// Serves the main stylesheet for Confetti Cuisine
router.get("/confetti_cuisine.css", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.css);
    utils.getFile("public/css/confetti_cuisine.css", res);
});

// Route: Bootstrap CSS framework
// Serves the Bootstrap CSS library
router.get("/bootstrap.css", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.css);
    utils.getFile("public/css/bootstrap.css", res);
});

// Route: Custom JavaScript file
// Serves the main JavaScript file for Confetti Cuisine
router.get("/confetti_cuisine.js", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.js);
    utils.getFile("public/js/confetti_cuisine.js", res);
});

// Create and start the HTTP server
// Uses the router.handle method to process all incoming requests
// Listens on the specified port (3000)
http.createServer(router.handle).listen(port);
console.log(`The server is listening on port number: ${port}`);