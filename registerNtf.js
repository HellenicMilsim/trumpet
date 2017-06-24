"use strict";

/**
 * Notify Recruiters of a new member registration
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */
exports.register_ntf = function register_ntf(req, res) {
  var request = require('request');
  var steamid;
  var username;
  var api_url = "hellenic-milsim.community";
  var api_user = 'apiUsername';
  var api_key = 'apiKey';

  try {
    if (req.body.user.last_seen_at !== null) {
      return;
    }

    username = req.body.user.username;
    steamid = req.body.user.user_fields['1'];
  } catch (e){
    res.status(400);
    return;
  }

  res.status(200);


  var formData = {
  // Pass a simple key-value pair 
  "api_key" : api_key,
  "api_username" : api_username,
    "title": "Νεα Εγγραφή: " + username,
    "raw": "Νέος χρήστης [" + username + "](https://www.hellenic-milsim.community/u/" + username + ")\n\nSteam ID: " + steamid,
    "category": 16,
};

  request.post(api_url).form(formData);

};
