const Spider  = require('../BaseSpider');
const rules   = require('../rules/ZDG');
const cheerio = require('cheerio');
const rp      = require('request-promise');
const db      = require('../db');
const _       = require('lodash');

class NewSpider extends Spider {

    constructor(){
        super('ZDG');
    }

    *parse(){

        // let url = "http://firefly.cecport.com/show/s/778.shtml";
        // let section = this.parseArticle(data.date, data.content);   

        let sqldata = yield db.get('origin_category_articles').findOne({category:"通讯系统"});
        for (let url of sqldata.articles){
            if (url === "http://firefly.cecport.com/show/s/778.shtml") break;
            let data = yield this.grab(url, rules);
            let section = this.parseArticle(data.date, data.content);   
            // let res = yield db.get('ZDG_article').insert(_.merge( data, { section } ));
            console.log('-------------> url', url);
            console.log('-------------> res', section);
        }
        return "okay";
    }

    parseArticle(date, content){
        let self = this;
        let $ = cheerio.load(content, { decodeEntities: false });
        let section = {};
        $('.marker').each(function(i, el){
            let sectionName = $(this).text().replace(/ /g,'');
            section[sectionName] = null;
            // ================== 归纳内容 ==================
            //图片处理
            let $$ = cheerio.load($(this).html(), { decodeEntities: false });
            if ($$('img').length > 0){
                section[sectionName] = `<${$$('img')['0'].name} src="${$$('img').attr('src')}"/>`;
                return;
            }
            // 如果兄弟节点没有有内容，归纳父亲节点的下一个无marker类的内容
            let nextSiblings = $(this).nextAll();
            if(nextSiblings.length === 0){
                let pNextSiblings = $(this).parent().nextAll();
                let hasMark = false, sectionContent = "";
                pNextSiblings.each(function(i,el){
                    if (self.hasMark($, $(this))) hasMark = true;
                    let tagName = $(this)['0'].name;
                    if (!hasMark) sectionContent += `<${tagName}>${$(this).html()}</${tagName}>`;
                });
                section[sectionName] = sectionContent;
                return;
            }
            //兄弟节点就是marker的内容
            let isMarker = false, sectionContent = "";
            nextSiblings.each(function(i, el){
                if ($(this).hasClass('marker')) isMarker = true;
                if(!isMarker){
                    sectionContent += $(this).html();
                }
            });
            section[sectionName] = sectionContent;
        });
        return section;
    }
    hasMark($, el){
        let hasMark = false;
        el.children().each(function(i, el){
            let className = $(this).attr('class');
            if (className && className.indexOf('marker') > -1) hasMark = true;
        });
        return hasMark;
    }

    getRangeArticleList(){
        let rangeUrls = (start, end) => Array(end - start + 1).fill(0).map((v, i) => `http://firefly.cecport.com/show/s/${i + start}.shtml`);
        return rangeUrls(1,1000);
    }

    *getCategory(){
        let url = "http://firefly.cecport.com/show/solutionlist?orderName=";
        let options = {
            uri: url,
            simple: false,
            transform: function (body, response) {
                if(response.statusCode !== 200) return null;
                return cheerio.load(body, { decodeEntities: false });
            }
        };
        let $ = yield rp(options);
        if (!$) return "not okay";
        let category = [];
        $('.jsType').children().last().children().each(function(i, el){
            category.push({
                name: $(this).text().replace(/\n|\t/g,''),
                alias: $(this).attr('href').split('?')[1].split('&')[0].split('=')[1]
            });
        });
        let res = yield db.get('category').insert({
            company: 'ZDG',
            list: category
        });
        return "okay";
    }

    *getArticleList(){
        let category = yield db.get('category').findOne({company:"ZDG"});
        for (let item of category.list){
            let url = "http://firefly.cecport.com/show/ajaxSolutionList";
            let options = {
                method: 'POST',
                uri: 'http://posttestserver.com/post.php',
                formData: {
                    pageNumber: 1,
                    firstType: item.alias
                },
                headers: {
                    /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
                },
                transform: function (body, response) {
                    if(response.statusCode !== 200) return null;
                    return cheerio.load(body, { decodeEntities: false });
                }
            };
            let $ = yield rp(url, options);
            let totalPages = $('#totalPages').attr('value');
            let articleLinks = [];
            for (let i = 1; i <=totalPages; i++ ){
                let options = {
                    method: 'POST',
                    uri: 'http://posttestserver.com/post.php',
                    formData: {
                        pageNumber: i,
                        firstType: 'SCHEME_COM'
                    },
                    transform: function (body, response) {
                        if(response.statusCode !== 200) return null;
                        return cheerio.load(body, { decodeEntities: false });
                    }
                };
                let $ = yield rp(url, options);
                $('.sol-item').each(function(i, el){
                    articleLinks.push($(this).children('dt').children('a').attr('href'));
                });
            }
            let res = yield db.get('origin_category_articles').insert({
                company: 'ZDG',
                category: item.name,
                articles: articleLinks
            });
        }
        return "okay";
    }
}

module.exports = NewSpider;