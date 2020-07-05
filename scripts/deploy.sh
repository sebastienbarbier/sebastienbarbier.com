cd $TRAVIS_BUILD_DIR/dist
rm -rf server prerender.js server.js
swift upload website .
