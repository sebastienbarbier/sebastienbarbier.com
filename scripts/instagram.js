// https://api.instagram.com/v1/users/self/media/recent/?access_token=487407.1677ed0.5b1098a0ca864bb09da9ba6f1b480270
var https = require('https');
var fs = require('fs');

https.get({
  host: 'api.instagram.com',
  path: '/v1/users/self/media/recent/?access_token=487407.1677ed0.5b1098a0ca864bb09da9ba6f1b480270'
}, function(response) {
  // Continuously update stream with data
  var body = '';
  response.on('data', function(d) {
      body += d;
  });
  response.on('end', function() {
    fs.writeFile("static/instagram_feed.json", body, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("Instagram feed cached in static/instagram_feed.json");
    });
  });
});
