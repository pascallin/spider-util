class NewSpider extends Spider {
    constructor(){
        super({name: 'easymoney'});
    }

    * parse () {
        let url = "http://www.eastmoney.com/"
        let res = yield this.htmlParse(url)
        return res
    }
}

module.exports = NewSpider;