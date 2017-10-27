module.exports = {
    articles: {
        rule: '#history .weui_msg_card div .weui_media_bd',
        children: {
            img: {
                rule: '.weui_media_hd',
                action: 'css',
                css: 'background-image',
                match: "/url(.)/g"
            },
            title: {
                rule: '.weui_media_title',
                action: 'text'
            },
            desc: {
                rule: '.weui_media_desc',
                action: 'text'
            },
            date: {
                rule: '.weui_media_extra_info',
                action: 'text'
            }
        },
    }
};
