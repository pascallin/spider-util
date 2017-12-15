class NewSpider extends Spider {
    constructor(){
        super({name: 'template'});
    }

    * parse (url) {
        let res = this.htmlParse(url)
        return res
    }
}

module.exports = NewSpider;