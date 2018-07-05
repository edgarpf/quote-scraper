var extractValues = require("extract-values");
var scraperjs = require('scraperjs');

module.exports = (name) => {	
    name = name.toLowerCase().replace(' ', '_');
	
	scraperjs.StaticScraper.create('https://www.pensador.com/' + name)
		.scrape(($) => {
			return $(".autorTotal strong, .total").map(function() {
				console.log("name = "+name);
				
				var text = $(this).text();
				var condition = 'de {quantity}';
				var numberOfSentencesPerPage = 20;
								
				var numberOfQuotes = parseInt(extractValues(text, condition).quantity); 
				
				console.log("numberOfQuotes = "+ numberOfQuotes);
				
				var numberOfPages = parseInt(numberOfQuotes/numberOfSentencesPerPage);	
				
				if(numberOfQuotes % numberOfSentencesPerPage !== 0){
					numberOfPages++;
				}
								
				console.log("numberOfPages = "  + numberOfPages);
                
				var sentences = [];
		        $(".frase").map(function(){sentences.push($(this).text());});
				
					
				
				return sentences;
			}).get();
		})
		.then((sentences) => {
			sentences.map(function(value){console.log("\n"+value+"\n")});
		})
}