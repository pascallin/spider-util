require('./core/Process');
const Spider = require('./spiders/eastmoney');
const co = require('co');

let spider = new Spider();
co(function*(){
    console.info('app start')
    let s = Date.now()
    let r = yield spider.parse();
    console.info('finished, used time: ', Date.now() - s);
    exitApp();
}).catch((e) => {
    console.error(e.stack);
    exitApp();
});