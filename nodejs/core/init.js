global.Spider  = require('./Spider');
global.db = require('./mongodb');

global.exitApp = function(){
    db.close();
};