const cheerio     = require('cheerio');
const rp          = require('request-promise');
const _           = require('lodash');
const RulesParser = require('./RulesParser')

class Spider {
    constructor(name){
        this.name = name;
    }

    *loadPage(url, opt){
        var options = {
            uri: url,
            simple: false,
            headers: _.merge({
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:57.0) Gecko/20100101 Firefox/57.0',
            }, opt.headers),
            transform: function (body, response) {
                if(response.statusCode !== 200) throw new Error(response.statusCode);
                return cheerio.load(body, { decodeEntities: false });
            }
        };
        let $ = yield rp(options);
        if (!$) return null;
        return $;
    }

    *grab(url, rules){
        let $ = yield this.loadPage(url);
        if (!$) return null;
        let data = {};
        for (let k in rules){
            if(rules[k].children){
                let children = [];
                $(rules[k].rule).each(function(i, el){
                    let $$ = cheerio.load($(this).html());
                    let childrenData = {};
                    for(let kk in rules[k].children){
                        childrenData[kk] = RulesParser.execute($$, rules[k].children[kk]);
                    }
                    children.push(childrenData);
                });
                data[k] = children;
            } else {
                data[k] = RulesParser.execute($, rules[k]);
            }
        }
        return data;
    }
}