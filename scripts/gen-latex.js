import fs from 'fs';
import Handlebars from 'handlebars';

Handlebars.registerHelper('escapeLatex', function (text) {
  if (typeof text !== 'string') return text;
  return text
    .replace(/&/g, '\\&') // & → \&
    .replace(/#/g, '\\#'); // # → \#
});

const data = JSON.parse(fs.readFileSync('src/i18n/locales/en.json', 'utf8'));
const tpl = fs.readFileSync('src/templates/cv.tex.hbs', 'utf8');
const render = Handlebars.compile(tpl);
let output = render(data);

output = output
  .replace(/<underline>([\s\S]*?)<\/underline>/g, '\\underline{$1}')
  .replace(/&/g, '\\&');

fs.writeFileSync('cv.tex', output);
console.log('LaTeX CV generated successfully!');
