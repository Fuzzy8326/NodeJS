"use strict";

// Required modules
const fs = require("fs"),                      // Node.js file system module for reading files
    httpStatus = require("http-status-codes"), // Library providing HTTP status code constants
    contentTypes = require("./contentTypes");  // Custom module containing MIME type definitions

// Export utility functions as a module
module.exports = {
    // Function to read and serve a file
    // Parameters:
    //   file - path to the file to be read (relative to project root)
    //   res - HTTP response object to send the file data back to client
    getFile: (file, res) => {
        // Asynchronously read the file from the file system
        // './${file}' prepends current directory to the file path
        fs.readFile(`./${file}`, (error, data) => {
            // Check if an error occurred during file reading
            if (error) {
                // Send 500 Internal Server Error status with HTML content type
                res.writeHead(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR, contentTypes.html);
                // Send error message to client and end the response
                res.end("There was an error serving content!");
            }
            // If no error, send the file data to the client and end the response
            res.end(data);
        });
    }
};