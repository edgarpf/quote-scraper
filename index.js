var extractValues = require("extract-values");
var scraperjs = require('scraperjs');

module.exports = function(name) {		
	scraperjs.StaticScraper.create('https://www.pensador.com/' + name.toLowerCase().replace(' ', '_'))
		.scrape(function($) {
			return $(".autorTotal strong, .total").map(function() {
				var text = $(this).text();
				var condition = 'de {quantity}';
				
				if(text.includes("frases")){
					condition = 'de {quantity} frases';
				}
				
				var numberPages = parseInt(extractValues(text, condition).quantity);							
				return numberPages;
			}).get();
		})
		.then(function(news) {
			console.log(news[0]);
		})
}