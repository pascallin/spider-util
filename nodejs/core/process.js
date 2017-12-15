global.Spider  = require('./Spider')
global.db      = require('./mongodb')
global._       = require('lodash')

global.exitApp = function(){
    db.close();
};