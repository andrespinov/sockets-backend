const path  = require('path');
const config = {
  root:path.normalize(path.join(__dirname, '/../..')),
  server: {
    port: process.env.PORT || 3000
  }
};

module.exports = config;
