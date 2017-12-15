module.exports = {
    execute($, rule){
        let result;
        let elem = $(rule.rule);
        if (rule.eq){
            elem = elem.eq(parseInt(rule.eq));
        }
        if (rule.action === 'attr'){
            result = elem.attr(rule.attr);
        }
        if (rule.action === 'css'){
            result = elem.css(rule.css);
        }
        if (rule.action === 'text' && (!rule.type || rule.type === 'string')){
            result = elem.text();
        }
        if (rule.action === 'text' && rule.type && rule.type === 'list'){
            result = [];
            elem.each(function(i, el){
                let text = $(this).text();
                result.push(text);
            });
        }
        if (rule.action === 'html' && (!rule.type || rule.type === 'string')){
            result = elem.html();
        }
        if (_.has(rule, 'match') || _.has(rule, 'replace') || _.has(rule, 'exec')){
            if (typeof(result) === 'string'){
                result = parseTextFilter(result, rule);
            } else {
                result = result.map(value => {
                    return parseTextFilter(value, rule);
                });
            }
        }
        return result;
    }
} 

function parseTextFilter(text, rule){
    if (rule.match && text) text = text.match(eval(rule.match))[0];
    if (rule.replace && text) text = text.replace(eval(rule.replace),'');
    if (rule.exec && text){
        if (eval(rule.exec).test(text)){
            text = eval(rule.exec).exec(text)[1];
        } else {
            text = '0';
        }
    } 
    return text;
}