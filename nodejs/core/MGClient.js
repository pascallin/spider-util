const monk = require('monk');
const config = require('../config')
// Connection URL
const url = config.mongodb.host + '/' + config.mongodb.db;
const db = monk(url);
db.then(() => {
  console.log('Connected correctly to server');
});
module.exports = db;
