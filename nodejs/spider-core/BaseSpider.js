const cheerio = require('cheerio');
const rp      = require('request-promise');
const _       = require('lodash');

class Spider {
    constructor(name){
        this.name = name;
    }

    *loadPage(url){
        var options = {
            uri: url,
            simple: false,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:57.0) Gecko/20100101 Firefox/57.0',
                'Cookie': 'CXID=9DA60F96D5FDF58B31E48C5FD70068E6; SUID=024F990E4B238B0A595F581000047A90; SUV=00B501F00E994D2A598299CE731E6603; ad=Plllllllll2BHuZolllllVXZnw7lllllRIOGUkllll9lllllpylll5@@@@@@@@@@; ABTEST=7|1508151994|v1; SNUID=F2B660F7F9FCA6CB84D8BBEEFAD60245; IPLOC=CN4403; JSESSIONID=aaaDwxbeodgVFffEOcv8v; weixinIndexVisited=1; sct=126; ld=byllllllll2BiQLFlllllVXHI67lllllRIO5Byllll9lllllVZlll5@@@@@@@@@@; LSTMV=254%2C71; LCLKINT=1634; PHPSESSID=4doetqme5nhq1to25sep03qgu4; SUIR=F2B660F7F9FCA6CB84D8BBEEFAD60245; successCount=3|Wed, 25 Oct 2017 11:43:00 GMT; seccodeRight=success; refresh=1'
            },
            transform: function (body, response) {
                console.log('-------------> body', body);
                if (body.indexOf('您的访问过于频繁') > -1) throw new Error('您的访问过于频繁');
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
                        childrenData[kk] = parseRule($$, rules[k].children[kk]);
                    }
                    children.push(childrenData);
                });
                data[k] = children;
            } else {
                data[k] = parseRule($, rules[k]);
            }
        }
        return data;
    }
}

function parseRule($, rule){
    let result;
    let elem = $(rule.rule);
    if (rule.eq){
        elem = elem.eq(parseInt(rule.eq));
    }
    if (rule.action === 'attr'){
        result = elem.attr(rule.attr);
    }
    if (rule.action === 'css'){
        result = elem.css(rule.css);
    }
    if (rule.action === 'text' && (!rule.type || rule.type === 'string')){
        result = elem.text();
    }
    if (rule.action === 'text' && rule.type && rule.type === 'list'){
        result = [];
        elem.each(function(i, el){
            let text = $(this).text();
            result.push(text);
        });
    }
    if (rule.action === 'html' && (!rule.type || rule.type === 'string')){
        result = elem.html();
    }
    if (_.has(rule, 'match') || _.has(rule, 'replace') || _.has(rule, 'exec')){
        if (typeof(result) === 'string'){
            result = parseTextFilter(result, rule);
        } else {
            result = result.map(value => {
                return parseTextFilter(value, rule);
            });
        }
    }
    return result;
}

function parseTextFilter(text, rule){
    if (rule.match && text) text = text.match(eval(rule.match))[0];
    if (rule.replace && text) text = text.replace(eval(rule.replace),'');
    if (rule.exec && text){
        console.log('-------------> text', text);
        if (eval(rule.exec).test(text)){
            text = eval(rule.exec).exec(text)[1];
        } else {
            text = '0';
        }
    } 
    return text;
}

module.exports = Spider;