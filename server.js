// Dependencies
var http = require("http");
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");
var express = require("express");

// Sets up the Express App
// =============================================================
var app = express();

//Setting port to 8080
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());


// var server = http.createServer(handleRequest);

require(path.join(__dirname + "/routing/apiRoutes"))(app);
require(path.join(__dirname + "/routing/htmlRoutes"))(app);

// Start our server
app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});