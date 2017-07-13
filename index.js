"use strict";

/**
 * Notify Recruiters of a new member registration
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */
 exports.register_ntf = function register_ntf(req, res) {
 	var request = require('request');
 	var api = require('./secrets.json');
 	var steamid;
 	var username;
 	var api_url = api.discourse.url;

 	try {
 		if (req.body.user.last_seen_at !== null) {
 			return;
 		}

 		username = req.body.user.username;

 		// Get steam ID from custom fields
 		steamid = req.body.user.user_fields['1'];
 	} catch (e) {
 		res.status(400);
 		return;
 	}

 	res.status(200);


 	var formData = {
		// Pass a simple key-value pair 
		"api_key": api.discourse.key,
		"api_username": api.discourse.user,

		// Topic title and body. Include steam ID from custom fields
		"title": "Νεα Εγγραφή: " + username,
		"raw": "Νέος χρήστης [" + username + "]" + api_url + "/u/" + username + ")\n\nSteam ID: " + steamid,
		"category": 16,
	};

	console.log("gots");

	request.post({
		url: api_url + "/posts",
		"form": formData
	},


	function(err, httpResponse, body) {
//      console.log(err);
//		console.log(body);
//      console.log(httpResponse);
});

};
