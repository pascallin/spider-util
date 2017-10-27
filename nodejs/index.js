const Spider = require('./spider-core/sougou-api');
// const Spider = require('./spider-core/keywords');
const co = require('co');
const db = require('./db');

let spider = new Spider();
co(function*(){
    let r = yield spider.parse();
    console.log('-------------> r', r);
    db.close();
}).catch(e => console.error(e.stack));