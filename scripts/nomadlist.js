require('dotenv').config()
var https = require('https');
var fs = require('fs');
var geoTz = require('geo-tz');

const fetch = require('node-fetch');

fetch(`https://nomadlist.com/@sebastienbarbier.json`)
  .then(res => res.json())
  .then(json => {

    // Fetch timezone from NOW location
    const now = json.location.now;
    const timezone = geoTz(now.latitude, now.longitude);
    if (timezone && timezone.length) {
      json.location.now.timezone = timezone[0];
    }

    const next = json.location.next;
    const timezone_next = geoTz(next.latitude, next.longitude);
    if (timezone_next && timezone_next.length) {
      json.location.next.timezone = timezone_next[0];
    }

    const path = "src/assets/json/nomadlist_feed.json";
    fs.writeFile(path, JSON.stringify(json), function(err) {
      if(err) {
        console.log(err);
        return process.exit(-1);
      }
      console.log(`Nomadlist feed cached in ${path}`);
      process.exit(0);
    });
  }).catch(e => {
    console.error(e);
    return process.exit(-1);
  });
