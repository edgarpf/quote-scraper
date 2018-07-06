var assert = require('assert');
var quoteScraper = require('./');

quoteScraper('Mark Twain'); 
quoteScraper('khalil_gibran'); 
quoteScraper('Alvo Dumbledore', 'pensador'); 
quoteScraper('alvo dumbledore', 'pensador', 5); 
quoteScraper('Mark Twain', 'pensador', 10000); 