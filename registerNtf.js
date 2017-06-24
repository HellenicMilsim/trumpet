"use strict";

/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */
exports.register_ntf = function register_ntf(req, res) {
  var steamid;
  var username;
  var api_user = 'apiUsername';
  var api_key = 'apiKey';

  try {
    if (req.body.user.last_seen_at !== null) {
      return;
    }

    username = req.body.user.username;
    steamid = req.body.user.user_fields['1'];
  } catch {
    res.status(400);
    return;
  }

  res.status(200);


  var obj = {
    "title": "Νεα Εγγραφή: " + username,
    "raw": "Νέος χρήστης [" + username + "](https://www.hellenic-milsim.community/u/" + username + ")\n\nSteam ID: " + steamid,
    "category": 0, //TODO !!!!
  }
  
//TODO Figure out multipart requests in node
  
  var options = {
    host: "https://hellenic-milsim.community",
    port: 80,
    path: '/?api_key=' + api_key + '&api_username=' + api_username,
    method: 'POST'
  };

  https.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      console.log('BODY: ' + chunk);
    });
  }).end();

};
