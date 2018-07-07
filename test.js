var assert = require('assert');
var quoteScraper = require('./');

console.log('test for es');
quoteScraper('mark twain', 'es');
console.log('test for fr');
quoteScraper('mark twain', 'fr');
console.log('test for en');
quoteScraper('Agatha Christie');
console.log('test for pt_br');
quoteScraper('mark twain', 'pt_br'); 
console.log('test for pt_br with pages');
quoteScraper('mark twain', 'pt_br', 5); 
console.log('test for pt_br with page overflow');
quoteScraper('mark twain', 'pt_br', 1000); 
console.log('test for pt_br with max pages');
quoteScraper('mark twain', 'pt_br', 'max'); 
console.log('test for pt_br with unknow language');
quoteScraper('mark twain', 'unknow language', 'max'); 


console.log('test for page not found for pt_br');
quoteScraper('mdscscsdcain222', 'pt_br', 5);
console.log('test for page not found for english');
quoteScraper('georgfdbfgbfgbfgbg');
console.log('test for page not found for es');
quoteScraper('georgfdbfgbfgbfgbg', 'es');
console.log('test for page not found for fr');
quoteScraper('georgfdbfgbfgbfgbg', 'fr');