const Spider  = require('./BaseSpider');
const rules   = require('../rules/keywords');
const db      = require('../db');

class NewSpider extends Spider{
    
    constructor(){
        super('keywords');
    }

    *parse(){
        let url = "http://www.elecfans.com/";
        let data = yield this.grab(url, rules.elecfans);
        // let url = "http://www.hqchip.com/";
        // let data = yield this.grab(url, rules.hqchip);
        data.source = url;
        let res = yield db.get('keywords').insert(data);
        return data;
    }
}

module.exports = NewSpider;