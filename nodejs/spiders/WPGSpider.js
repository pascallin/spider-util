const cheerio = require('cheerio');
const rp      = require('request-promise');
const Spider  = require('../BaseSpider');
const rules   = require('../rules/WPG');

class NewSpider extends Spider{
    
    constructor(){
        super('WPG');
    }

    *parse(){
        let url = "http://www.wpgholdings.com/news/detail/zhtw/program/20840";  //debug
        let data = yield this.getArticleInfo(url, rules);
        return data;
    }

    *articleList(){
        let categoryList = [
            'http://www.wpgholdings.com/news/program/zhtw/1',
            'http://www.wpgholdings.com/news/program/zhtw/2',
            'http://www.wpgholdings.com/news/program/zhtw/3',
            'http://www.wpgholdings.com/news/program/zhtw/4',
            'http://www.wpgholdings.com/news/program/zhtw/5',
            'http://www.wpgholdings.com/news/program/zhtw/6',
        ];
        let url = categoryList[0];
        let options = {
            uri: url,
            simple: false,
            transform: function (body, response) {
                console.log('-------------> url request finished');
                if(response.statusCode !== 200) return null;
                return cheerio.load(body, { decodeEntities: false });
            }
        };
        let $ = yield rp(options);
        if (!$) return "not okay";
        // 获取条数
        let last = $('.pagination li .last').attr('href').split('/').pop();
        //获取目录下全部文章链接
        let articleUrls = [];
        for (let i = 20; i <= last; i+=20){
            console.log('-------------> i', i);
            let options = {
                uri: url,
                simple: false,
                transform: function (body, response) {
                    console.log('-------------> url request finished');
                    if(response.statusCode !== 200) return null;
                    return cheerio.load(body, { decodeEntities: false });
                }
            };
            let $ = yield rp(options);
            $('.news-item').each(function(i, el){
                articleUrls.push($(this).children('.news_content_area').children('a').attr('href'));
            });
        }
        console.log('-------------> articleUrls', articleUrls.length);
        return "okie";
    }
}

module.exports = NewSpider;