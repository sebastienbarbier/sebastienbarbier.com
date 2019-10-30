// https://api.instagram.com/v1/users/self/media/recent/?access_token=487407.1677ed0.5b1098a0ca864bb09da9ba6f1b480270

require('dotenv').config()
var https = require('https');
var fs = require('fs');

https.get({
  host: 'api.instagram.com',
  path: `/v1/users/self/media/recent/?access_token=${process.env.INSTAGRAM_TOKEN}`
}, function(response) {
  // Continuously update stream with data
  var body = '';
  response.on('data', function(d) {
      body += d;
  });
  response.on('end', function() {
    const json = JSON.parse(body);
    delete json.pagination;
    fs.writeFile("src/assets/json/instagram_feed.json", JSON.stringify(json), function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("Instagram feed cached in src/assets/json/instagram_feed.json");
    });
  });
});
