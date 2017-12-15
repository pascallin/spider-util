module.exports = {
    execute($, rule){
        let result;
        let elem = $(rule.rule);
        // set type
        if (!rule.type) rule.type = 'string'
        // pre action
        if (rule.eq){
            elem = elem.eq(parseInt(rule.eq));
        }
        // action
        if (rule.type === 'list'){
            result = [];
            elem.each(function(i, el){
                if (rule.list) {
                    let temp = {}
                    for (let j in rule.list) {
                        temp[j] = parseAction($(this), rule.list[j])
                    }
                    return result.push(temp);
                }
                let temp = parseAction($(this), rule)
                result.push(temp);
            });
        }
        if (rule.type === 'string'){
            result = parseAction(elem, rule)
        }
        // after action
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

function parseAction (elem, rule) {
    let result
    switch (rule.action) {
        case "text": result = elem.text(); break
        case "css": result = elem.css(rule.css); break
        case "attr": result = elem.attr(rule.attr); break
        case "html": result = elem.html(); break
    }
    return result
}

function parseTextFilter (text, rule) {
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