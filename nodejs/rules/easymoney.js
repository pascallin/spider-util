module.exports = {
    nlist: {
        rule: '.nlist ul li a',
        type: 'list',
        list: {
            title: {
                action: 'text'
            },
            link: {
                action: 'attr',
                attr: 'href'
            }
        },
    }
}