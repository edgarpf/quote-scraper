# quote-scraper [![Build Status](https://travis-ci.org/edgarpf/quote-scraper.svg?branch=master)](https://travis-ci.org/edgarpf/quote-scraper) [![codecov](https://codecov.io/gh/edgarpf/quote-scraper/branch/master/graph/badge.svg)](https://codecov.io/gh/edgarpf/quote-scraper) [![Maintainability](https://api.codeclimate.com/v1/badges/bae84ef93f2e4f7eeb11/maintainability)](https://codeclimate.com/github/edgarpf/quote-scraper/maintainability)
A npm package to get famous quotes in english and brazilian portuguese.  

## Installation
```js
npm i -S quote-scraper
```

## Usage
```js
var quoteScraper = require('quote-scraper');

// quote-scraper gives you an array with famous quote from someone. 
// Just give the name (case insensitive) and you will get quotes in english.
console.log(quoteScraper('Agatha Christie')); 

//You can also get quotes in brazilian portuguese
console.log(quoteScraper('mark twain', 'pt_br')); 

//Using pt_br you can give a number of page to get more quotes. 
//Do not worry about a big number. 
//The library will handle it automatically.
console.log(quoteScraper('mark twain', 'pt_br', 5)); 

//or you can use 'max' to get the maximum number of quotes.
console.log(quoteScraper('mark twain', 'pt_br', 'max')); 

```
