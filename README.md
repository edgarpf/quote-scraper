# quote-scraper [![Build Status](https://travis-ci.org/edgarpf/quote-scraper.svg?branch=master)](https://travis-ci.org/edgarpf/quote-scraper) [![codecov](https://codecov.io/gh/edgarpf/quote-scraper/branch/master/graph/badge.svg)](https://codecov.io/gh/edgarpf/quote-scraper) [![Maintainability](https://api.codeclimate.com/v1/badges/bae84ef93f2e4f7eeb11/maintainability)](https://codeclimate.com/github/edgarpf/quote-scraper/maintainability)
A npm package to get famous quotes.  

## Installation
```js
npm i -S quote-scraper
```

## Usage
```js
var quoteScraper = require('quote-scraper');

// quote-scraper gives you an array with famous quote from someone. 
// Just give the name (it is case insensitive) and that's it.

console.log(quoteScraper('Agatha Christie')[0]); 
console.log(quoteScraper('alvo_dumbledore')[0]); 

```

The library is currently in active development and for now it only gives quotes in brazilian portuguese. 
