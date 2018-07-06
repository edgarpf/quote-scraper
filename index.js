const extractValues = require("extract-values");
const scraperjs = require('scraperjs');
const wait = require('wait-for-stuff');

const URL_SITE_QUOTE_PT_BR = 'https://www.pensador.com/';
const URL_SITE_ENGLISH_QUOTE = 'https://www.brainyquote.com/authors/'

module.exports = (name, source = 'brainyquote', numberOfPages = 1) => {	
	var sentences = [];
	var isComplete = {'isReadComplete' : false};
	name = name.toLowerCase().replace(' ', '_');
	
	if(source === 'brainyquote'){
		scraperjs.StaticScraper.create(URL_SITE_ENGLISH_QUOTE+name)
		.scrape(function($) {
			return $(".b-qt").map(function() {
				 sentences.push($(this).text());
				 isComplete.isReadComplete = true;
			}).get();
		})
		
	}else if(source === 'pensador'){
		
		scraperjs.StaticScraper.create(URL_SITE_QUOTE_PT_BR + name)
			.scrape(($) => {
				$(".autorTotal strong, .total").map(function() {				
					var text = $(this).text();
					var condition = 'de {quantity}';
					var numberOfSentencesPerPage = 20;
									
					var numberOfQuotes = parseInt(extractValues(text, condition).quantity); 				
					var numberMaxOfPages = parseInt(numberOfQuotes/numberOfSentencesPerPage);	
										
					if(numberOfPages > numberMaxOfPages){
						numberOfPages = numberMaxOfPages;
					}
					
					if(numberOfQuotes % numberOfSentencesPerPage !== 0 && numberOfPages > 1){
						numberOfPages++;
					}
													
					$(".frase").map(function(){sentences.push($(this).text());});	
					
					isComplete.isReadComplete = numberOfPages === 1;
					                 			
					for(var i=2;i<=numberOfPages;i++){
						scraperjs.StaticScraper.create(URL_SITE_QUOTE_PT_BR  + name + '/' + i)
						.scrape(function ($) {
							$(".frase").map(function(){sentences.push($(this).text());});
							isComplete.isReadComplete = sentences.length > (numberOfPages-1)*numberOfSentencesPerPage;																								
						});
					}	
				});
			});
	}
	
	wait.for.value(isComplete, 'isReadComplete' ,true);
	return sentences;
}

function addElements(data){
	var sentences = [];
	if(data.quotes == null){
		return sentences;
	}
	
	for(var i=0;i<data.quotes.length;i++){
		sentences.push(data.quotes[i].quote);
	}
	
	return sentences;
}