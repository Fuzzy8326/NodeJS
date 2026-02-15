const port = 3000,               //Define the port number 
    express = require("express"),  // Import the Express library to create a server
    app = express();               // Create an instance of an Express application

// Define a route handler for HTTP GET requests to the root URL ("/")
app.get("/", (req, res) => {
    console.log("Route parameters:", req.params); // Will be empty here because no parameters are defined
    console.log("Request body:", req.body);       // Contains data sent by the client (e.g., POST request body)
    console.log("Request URL:", req.url);        // The full request URL path
    console.log("Query string:", req.query);     // Contains query string values

    res.send("Hello, Universe!");  // Send a plain text response back to the client
})

    // Start the server 
    .listen(port, () => {
        console.log(`The Express.js server has started and is listening on port number: ${port}`);  // Log a message once the server is running successfully
    });
