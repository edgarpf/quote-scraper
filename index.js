var extractValues = require("extract-values");
var scraperjs = require('scraperjs');

module.exports = function(name) {	
    name = name.toLowerCase().replace(' ', '_');
	
	scraperjs.StaticScraper.create('https://www.pensador.com/' + name)
		.scrape(function($) {
			return $(".autorTotal strong, .total").map(function() {
				console.log("name = "+name);
				
				var text = $(this).text();
				var condition = 'de {quantity}';
				var numberOfSentencesPerPage = 20;
								
				var numberOfQuotes = parseInt(extractValues(text, condition).quantity); 
				
				console.log("numberOfQuotes = "+ numberOfQuotes);
				
				var numberOfPages = parseInt(numberOfQuotes/numberOfSentencesPerPage);	
				
				if(numberOfQuotes % numberOfSentencesPerPage!== 0){
					numberOfPages++;
				}
								
				console.log("numberOfPages = "  + numberOfPages);				
				return numberOfPages;
			}).get();
		})
		.then(function(news) {
			console.log("news = "+news[0]);
		})
}