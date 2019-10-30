// https://api.instagram.com/v1/users/self/media/recent/?access_token=487407.1677ed0.5b1098a0ca864bb09da9ba6f1b480270
var https = require('https');
var fs = require('fs');

https.get({
  host: 'nomadlist.com',
  path: '/@sebastienbarbier.json'
}, function(response) {
  // Continuously update stream with data
  var body = '';
  response.on('data', function(d) {
      body += d;
  });
  response.on('end', function() {
    fs.writeFile("src/assets/json/nomadlist_feed.json", body, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("Nomadlist feed cached in src/assets/json/nomadlist_feed.json");
    });
  });
});
