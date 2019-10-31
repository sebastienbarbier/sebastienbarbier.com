// https://api.instagram.com/v1/users/self/media/recent/?access_token=487407.1677ed0.5b1098a0ca864bb09da9ba6f1b480270

require('dotenv').config()
var https = require('https');
var fs = require('fs');

const fetch = require('node-fetch');

fetch(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${process.env.INSTAGRAM_TOKEN}`)
  .then(res => res.json())
  .then(json => {
    delete json.pagination;

    const promises = [];

    // Download top 12 images
    json.data.forEach(post => {
      const image = post.images.standard_resolution;
      post.images.local = {
        width: image.width,
        height: image.height,
        url: `/assets/images/instagram/${post.id}.jpg`
      };
      promises.push(fetch(image.url)
        .then(res => {
            const dest = fs.createWriteStream(`src${post.images.local.url}`);
            res.body.pipe(dest);
        })
      );
    });

    return Promise.all(promises).then(() => {
      fs.writeFile("src/assets/json/instagram_feed.json", JSON.stringify(json), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Instagram feed cached in src/assets/json/instagram_feed.json");
      });
    });
  });
