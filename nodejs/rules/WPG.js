module.exports = {
    title: {
        rule: '.news-content h1',
        action: 'text'
    },
    date: {
        rule: '.news-content .news-sub-title-area .publish-date-area',
        action: 'text',
        match: "/\\d+-\\d+-\\d+/g"
    },
    tags: {
        rule: '.news-tag',
        type: 'list',
        action: 'text',
        replace: "/[\\s+|\\|]/g"
    },
    content: {
        rule: ".content_message_area",
        action: 'html'
    }
};