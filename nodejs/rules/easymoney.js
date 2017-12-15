module.exports = {
    nlist: {
        rule: '.nlist ul li',
        type: 'list',
        action: 'text'
    },
    nlist_link: {
        rule: '.nlist ul li a',
        type: 'list',
        action: 'attr',
        attr: 'href'
    }
}