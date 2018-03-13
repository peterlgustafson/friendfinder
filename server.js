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

function handleRequest(req, res) {

    // Capture the url the request is made to
    var path = req.url;

    // When we visit different urls, read and respond with different files
    switch (path) {

        case "/survey":
            return fs.readFile(__dirname + "/public/survey.html", function (err, data) {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            });

        // default to rendering home.html, if none of above cases are hit
        default:
            return fs.readFile(__dirname + "/public/home.html", function (err, data) {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            });
    }
    }

    // var surveyResults = function(req,res) {


    // Saving the request data as a variable
    // var requestData = "";

    // // When the server receives data...
    // req.on("data", function (data) {

    //  // Add it to requestData.
    // requestData += data;
    // });

    // // When the request has ended...
    // req.on("end", function () {

    //     // Log (server-side) the request method, as well as the data received!
    //     console.log(requestData);
    //     res.end();
    // });
// };

// Start our server
app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});