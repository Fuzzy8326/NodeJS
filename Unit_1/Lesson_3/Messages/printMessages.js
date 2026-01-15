// Listing 3.1
"use strict";

// Import the messageModule from the local 'messages.js' file
const messageModule = require("./messages");

// Loop through each message in the messages array and print it to the console
messageModule.messages.forEach(m => console.log(m));
