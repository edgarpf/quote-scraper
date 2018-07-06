var assert = require('assert');
var quoteScraper = require('./');

quoteScraper('Agatha Christie'); 
quoteScraper('mark twain', 'pt_br'); 
quoteScraper('mark twain', 'pt_br', 5); 
quoteScraper('mark twain', 'pt_br', 1000); 
quoteScraper('mark twain', 'pt_br', 'max'); 