// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Friends (DATA)
// =============================================================
var friends = require("../data/friends.js");

// Routes
// =============================================================
module.exports = function (app) {
	// Get all potential friends
	app.get("/api/friends", function (req, res) {
		res.json(friends);
	});

	//Variable to calculate total difference between user scores
	var totalDifference = 0;

	app.post("/submitSurvey", function (req, res) {
		var friendFinderMatch = {
			name: "",
			image: "",
			scoresDifference: 2000
		};

		var userSurveyData = req.body;
		var userName = userSurveyData.name;
		var userImage = userSurveyData.photo;
		var userScores = userSurveyData.scores;

		//loop through the friends data array of objects to get scores
		for (var i = 0; i < friends.length - 1; i++) {
			totalDifference = 0;

			//loop through that friends score and the users score and calculate absolute value between the two & set to total difference variable
			for (var s = 0; s < 10; s++) {
				// Calculate difference between the scores and sum them into the totalDifference
				totalDifference += Math.abs(parseInt(userScores[s]) - parseInt(friends[i].scores[s]));
				// If the sum of differences is less then the differences of current friend match
				if (totalDifference <= friendFinderMatch.scoresDifference) {

					// Reset the Friend Finder Match to the result 
					friendFinderMatch.name = friends[i].name;
					friendFinderMatch.image = friends[i].photo;
					friendFinderMatch.scoresDifference = totalDifference;
				}
			}
		}

		friends.push(userSurveyData);

		res.json(friendFinderMatch);

	});
}
