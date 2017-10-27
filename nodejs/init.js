global.Spider  = require('./spider-core');
global.db = require('./db');

global.exitApp = function(){
    db.close();
};