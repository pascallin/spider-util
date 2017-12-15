global.Spider  = require('./Spider');
global.db = require('./MGClient');

global.exitApp = function(){
    db.close();
};