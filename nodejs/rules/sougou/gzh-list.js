module.exports = {
    gzh: {
        rule: '.news-list2 li',
        children: {
            link: {
                rule: '.gzh-box2 .img-box a',
                action: 'attr',
                attr: 'href'
            },
            img: {
                rule: '.gzh-box2 .img-box a img',
                action: 'attr',
                attr: 'src'
            },
            name: {
                rule: '.gzh-box2 .txt-box .tit a',
                action: 'text'
            },
            weixin_id: {
                rule: '.gzh-box2 .txt-box .info label',
                action: 'text'
            },
            summary: {
                rule: 'dl dd',
                eq: '0',
                action: 'text'
            },
            monthly_news_count: {
                rule: '.gzh-box2 .txt-box .info',
                action: 'html',
                exec: "/月发文 (\\d+) 篇/g",
            }
        },
    }
};
