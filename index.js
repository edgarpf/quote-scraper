var extractValues = require("extract-values");
var scraperjs = require('scraperjs');

module.exports = function(name) {	
    name = name.toLowerCase().replace(' ', '_');
	
	scraperjs.StaticScraper.create('https://www.pensador.com/' + name)
		.scrape(function($) {
			return $(".autorTotal strong, .total").map(function() {
				var text = $(this).text();
				var condition = 'de {quantity}';
				
				if(text.includes("frases")){
					condition = 'de {quantity} frases';
				}
				
				var numberOfQuotes = parseInt(extractValues(text, condition).quantity); 
				var numberPages = parseInt(numberOfQuotes/20);	
				
				if(numberOfQuotes % 20 !== 0){
					numberPages++;
				}
								
				return numberPages;
			}).get();
		})
		.then(function(news) {
			console.log(news[0]);
		})
}