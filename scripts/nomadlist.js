require('dotenv').config()
var https = require('https');
var fs = require('fs');
var geoTz = require('geo-tz');

var countryFlagEmoji = require("country-flag-emoji");

const fetch = require('node-fetch');

var dir = './src/assets/json/';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

fetch(`https://nomads.com/@sebastienbarbier.json`)
  .then(res => res.json())
  .then(json => {

    // Fetch timezone from NOW location
    const now = json.location.now;
    const timezone = geoTz(now.latitude, now.longitude);
    if (timezone && timezone.length) {
      json.location.now.timezone = timezone[0];
    }
    if (json.location.now.country_code === "UK") {
      json.location.now.country_code = "GB";
    }
    json.location.now.flag = countryFlagEmoji.get(json.location.now.country_code).emoji;

    const next = json.location.next;
    if (next) {
      const timezone_next = geoTz(next.latitude, next.longitude);
      if (timezone_next && timezone_next.length) {
        json.location.next.timezone = timezone_next[0];
      }
      if (json.location.next.country_code === "UK") {
        json.location.next.country_code = "GB";
      }
      json.location.next.flag = countryFlagEmoji.get(json.location.next.country_code).emoji;
    }

    const path = "src/assets/json/nomads_feed.json";
    fs.writeFile(path, JSON.stringify(json), function(err) {
      if(err) {
        console.log(err);
        return process.exit(-1);
      }
      console.log(`Nomads feed cached in ${path}`);
      process.exit(0);
    });
  }).catch(e => {
    console.error(e);
    return process.exit(-1);
  });
