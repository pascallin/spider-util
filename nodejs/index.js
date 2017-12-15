require('./core/init');
const Spider = require('./spiders/keywords');
const co = require('co');

let spider = new Spider();
co(function*(){
    let r = yield spider.parse();
    console.log('-------------> r', r);
    exitApp();
}).catch((e) => {
    console.error(e.stack);
    exitApp();
});