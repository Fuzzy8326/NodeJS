"use strict"; // Enables strict mode for safer and cleaner JavaScript

// Import HTTP status code constants (e.g., 404, 500)
const httpStatus = require("http-status-codes");

// ===== ERROR LOGGING MIDDLEWARE =====
// This middleware logs the error stack trace to the console
// then passes the error to the next error-handling middleware
exports.logErrors = (error, req, res, next) => {
  console.error(error.stack); // Print full error details for debugging
  next(error); // Pass error to the next middleware in the chain
};

// ===== 404 - RESOURCE NOT FOUND HANDLER =====
// Handles requests for routes that do not exist
exports.respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND; // 404
  res.status(errorCode); // Set HTTP status code
  res.send(`${errorCode} | The page does not exist!`); // Send response message
};

// ===== 500 - INTERNAL SERVER ERROR HANDLER =====
// Handles unexpected server errors
exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR; // 500
  
  // Log the error stack for debugging
  console.log(`ERROR occurred: ${error.stack}`);
  
  res.status(errorCode); // Set HTTP status code
  res.send(
    `${errorCode} | Sorry, our application is experiencing a problem!`
  ); // Send user-friendly message
};