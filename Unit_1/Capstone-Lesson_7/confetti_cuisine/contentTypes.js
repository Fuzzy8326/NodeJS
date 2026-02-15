"use strict";

// Content type header definitions for HTTP responses
// These objects define the MIME types for different file formats
// Used in res.writeHead() to tell the browser how to interpret the response

module.exports = {
    // HTML content type
    // Used for serving HTML web pages
    html: {
        "Content-Type": "text/html"
    },
    
    // Plain text content type
    // Used for serving plain text files (.txt)
    text: {
        "Content-Type": "text/plain"
    },
    
    // JavaScript content type
    // Used for serving JavaScript files (.js)
    js: {
        "Content-Type": "text/js"
    },
    
    // JPEG image content type
    // Used for serving JPEG/JPG image files
    jpg: {
        "Content-Type": "image/jpg"
    },
    
    // PNG image content type
    // Used for serving PNG image files
    png: {
        "Content-Type": "image/png"
    },
    
    // CSS stylesheet content type
    // Used for serving CSS stylesheet files
    css: {
        "Content-Type": "text/css"
    }
};