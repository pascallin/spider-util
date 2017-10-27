module.exports = {
    title: {
        rule: '.idea-hd h1',
        action: 'text'
    },
    date: {
        rule: '.idea-hd .author',
        action: 'text',
        match: "/\\d+\\/\\d+\\/\\d+\\s+\\d+:\\d+/g"
    },
    tags: {
        rule: '.idea-hd .sol-keys a',
        type: 'list',
        action: 'text'
    },
    summary: {
        rule: "#solutionDes p",
        action: 'text'
    },
    content: {
        rule: "#solution-content",
        action: 'html',
        replace: "/\\n|\\t/g"
    },
    dev: {
        rule: "#solution-dev",
        action: 'html',
        replace: "/\\n|\\t/g"
    }
};