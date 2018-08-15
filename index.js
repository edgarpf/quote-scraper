const extractValues = require("extract-values");
const scraperjs = require('scraperjs');
const wait = require('wait-for-stuff');
const encodeUrl = require("encodeurl");

const URL_SITE_QUOTE_PT_BR = 'https://www.pensador.com/';
var URL_SITE_QUOTE;

var isComplete = {
    'isReadComplete': false
};
var sentences = [];

module.exports = (name, language = 'en', numberOfPages = 1) => {
    sentences = [];
	name = name.trim().toLowerCase();
	
	if(language === 'en'){
		URL_SITE_QUOTE = 'https://www.brainyquote.com/authors/';
		name = name.replace(' ', '_');
	} else if(language === 'es'){
		URL_SITE_QUOTE = 'https://www.brainyquote.com/es/autores/';
		name = name.replace(' ', '-');
	} else if(language === 'fr'){
		URL_SITE_QUOTE = 'https://www.brainyquote.com/fr/auteurs/';
		name = name.replace(' ', '-');
	} else{
		name = name.replace(' ', '_');
	}
	
    if (language === 'en' || language == 'fr' || language === 'es') {
        readQuotes(name);
    } else if (language === 'pt_br') {
        readBrazilianPortugueseQuotes(name, numberOfPages);
    } else {
        isComplete.isReadComplete = true;
    }

    wait.for.value(isComplete, 'isReadComplete', true);
    isComplete.isReadComplete = false;
    return sentences;
}

function readQuotes(name) {
    scraperjs.StaticScraper.create(encodeUrl(URL_SITE_QUOTE + name))
        .scrape(function($) {
            $(".thought-bubble, .row .bq_s").map(function() {
                isComplete.isReadComplete = true;
            });

            return $(".b-qt").map(function() {
                sentences.push($(this).text());
                isComplete.isReadComplete = true;
            }).get();
        })
}

function readBrazilianPortugueseQuotes(name, numberOfPages) {
    scraperjs.StaticScraper.create(encodeUrl(URL_SITE_QUOTE_PT_BR + name))
        .scrape(($) => {

            checkFor404($);

            $(".autorTotal strong, .total").map(function() {
                var text = $(this).text();
                var condition = 'de {quantity}';
                var numberOfSentencesPerPage = 20;

                var numberOfQuotes = parseInt(extractValues(text, condition).quantity);
                var numberMaxOfPages = parseInt(numberOfQuotes / numberOfSentencesPerPage);

                if (numberOfPages > numberMaxOfPages || numberOfPages === 'max') {
                    numberOfPages = numberMaxOfPages;
                }

                if (numberOfQuotes % numberOfSentencesPerPage !== 0 && numberOfPages > 1) {
                    numberOfPages++;
                }

                $(".frase").map(function() {
                    sentences.push($(this).text());
                });

                isComplete.isReadComplete = numberOfPages <= 1;
				
				if(!isComplete.isReadComplete){					
					readOtherPages(name, numberOfPages, numberOfSentencesPerPage); 
				}				
            });
        });
}

function readOtherPages(name, numberOfPages, numberOfSentencesPerPage){
	for (var i = 2; i <= numberOfPages; i++) {
		scraperjs.StaticScraper.create(encodeUrl(URL_SITE_QUOTE_PT_BR + name + '/' + i))
			.scrape(function($) {
				$(".frase").map(function() {
					sentences.push($(this).text());
				});
				isComplete.isReadComplete = sentences.length > (numberOfPages - 1) * numberOfSentencesPerPage;
			});
	}
}

function checkFor404($) {
    $(".top h1").map(function() {
        if ($(this).text().includes('404')) {
            isComplete.isReadComplete = true;
        }
    });
}