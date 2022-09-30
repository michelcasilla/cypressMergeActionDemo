import { defineParameterType } from "cypress-cucumber-preprocessor/steps";


defineParameterType({
    name: 'quotedInt',
    regexp: /'\d+'/,
    transformer: s => parseInt(s.replace(/['"]+/g, ''), 10)
});

defineParameterType({
    name: 'list',
    regexp: /\[.*\]/,
    transformer: s => s.substring(1, s.length - 1)
                        .replace(/(, )/g, ",").replace(/['"]/g, "").split(',')
});
