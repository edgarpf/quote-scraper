const extractValues = require("extract-values");
const scraperjs = require('scraperjs');
const wait = require('wait-for-stuff');

const URL_SITE_QUOTE_PT_BR = 'https://www.pensador.com/';
const URL_SITE_ENGLISH_QUOTE = 'https://www.brainyquote.com/authors/'

var isComplete = {'isReadComplete' : false};
var sentences = [];

module.exports = (name, language = 'en', numberOfPages = 1) => {	
	sentences = [];
	name = name.toLowerCase().replace(' ', '_');
	
	if(language === 'en'){
		readEnglishQuotes(name);
	}else if(language === 'pt_br'){
		readBrazilianPortugueseQuotes(name, numberOfPages);
	}
	
	wait.for.value(isComplete, 'isReadComplete' ,true);
	isComplete.isReadComplete = false;
	return sentences;
}

function readEnglishQuotes(name){
	scraperjs.StaticScraper.create(URL_SITE_ENGLISH_QUOTE+name)
		.scrape(function($) {
			return $(".b-qt").map(function() {
				 sentences.push($(this).text());
				 isComplete.isReadComplete = true;
			}).get();
		})
}

function readBrazilianPortugueseQuotes(name, numberOfPages){
	scraperjs.StaticScraper.create(URL_SITE_QUOTE_PT_BR + name)
			.scrape(($) => {
				$(".autorTotal strong, .total").map(function() {				
					var text = $(this).text();
					var condition = 'de {quantity}';
					var numberOfSentencesPerPage = 20;
									
					var numberOfQuotes = parseInt(extractValues(text, condition).quantity); 				
					var numberMaxOfPages = parseInt(numberOfQuotes/numberOfSentencesPerPage);	

					if(numberOfPages > numberMaxOfPages || numberOfPages === 'max'){
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