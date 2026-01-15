//Page 70 / 38
//Listing 3.2 - 3.5
"use strict";

// Import the 'cities' module, which allows you to look up city data by ZIP code
const cities = require("cities");

// Look up city details using a ZIP code (in this case, 10016)
var myCity = cities.zip_lookup("10004");

// Print the city information to the console
console.log(myCity);