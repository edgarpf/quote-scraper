var assert = require('assert');
var quoteScraper = require('./');

quoteScraper('Mark Twain'); 
quoteScraper('khalil_gibran'); 
quoteScraper('Alvo Dumbledore', 'pt'); 
quoteScraper('alvo dumbledore', 'pt', 5); 
quoteScraper('Mark Twain', 'pt', 10000); 