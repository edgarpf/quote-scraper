var extractValues = require("extract-values");
var scraperjs = require('scraperjs');
var wait = require('wait-for-stuff');
var URL_SITE_QUOTE_PT_BR = 'https://www.pensador.com/'
var isComplete = {'isReadComplete' : false, 'isAllComplete' : false};

module.exports = (name) => {	
    name = name.toLowerCase().replace(' ', '_');
	var sentences = [];
	
	scraperjs.StaticScraper.create(URL_SITE_QUOTE_PT_BR + name)
		.scrape(($) => {
			$(".autorTotal strong, .total").map(function() {
				//console.log("name = "+name);
				
				var text = $(this).text();
				var condition = 'de {quantity}';
				var numberOfSentencesPerPage = 20;
								
				var numberOfQuotes = parseInt(extractValues(text, condition).quantity); 
				
				//console.log("numberOfQuotes = "+ numberOfQuotes);
				
				var numberOfPages = parseInt(numberOfQuotes/numberOfSentencesPerPage);	
				
				if(numberOfQuotes % numberOfSentencesPerPage !== 0){
					numberOfPages++;
				}
								
				//console.log("numberOfPages = " + numberOfPages);
                
		        $(".frase").map(function(){sentences.push($(this).text());});
								
				for(var i=2;i<=numberOfPages;i++){
					scraperjs.StaticScraper.create(URL_SITE_QUOTE_PT_BR  + name + '/' + i)
					.scrape(function ($) {
						$(".frase").map(function(){sentences.push($(this).text());});												
						isComplete.isReadComplete = sentences.length > (numberOfPages-1)*numberOfSentencesPerPage;																								
					});
				}	
			});
		});
		
		wait.for.value(isComplete, 'isReadComplete' ,true);
		return sentences;
}