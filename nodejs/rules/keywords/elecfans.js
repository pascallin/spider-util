module.exports = {
    technology: {
        rule: '.tech-menu ul li',
        type: 'list',
        action: 'text'
    },
    application: {
        rule: '.application-menu ul li',
        type: 'list',
        action: 'text',
        replace: "/ /g"
    },
    topic: {
        rule: '.hot-content li',
        type: 'list',
        action: 'text',
        replace: "/·/"
    }
};