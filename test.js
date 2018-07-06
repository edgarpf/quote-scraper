var assert = require('assert');
var quoteScraper = require('./');

quoteScraper('Agatha Christie'); 
quoteScraper('mark twain', 'pt_br'); 
quoteScraper('mark twain', 'pt_br', 5); 
quoteScraper('mark twain', 'pt_br', 1000); 
quoteScraper('mark twain', 'pt_br', 'max'); 
quoteScraper('mark twain', 'unknow language', 'max'); 

//page not found
quoteScraper('mdscscsdcain222', 'pt_br', 5);
quoteScraper('georgfdbfgbfgbfgbg');