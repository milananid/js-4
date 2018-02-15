$(function() {
  String.prototype.decodeHTML = function() {
    return $("<div>", {html: "" + this}).html();
  };

  var $main = $("#main"),
  
  init = function() {
    // Do this when a page loads.
  },
  
  ajaxLoad = function(html) {
    document.title = html
      .match(/<title>(.*?)<\/title>/)[1]
      .trim()
      .decodeHTML();	
	
	$(window).trigger('ajaxpage.loaded');
    init();
    $(window).trigger('ajaxpage.ready');
  },
  
  loadPage = function(href) {
  	$(window).trigger('ajaxpage.load');
    $main.load(href + " #main>*", ajaxLoad);
  };
  
  init();
  
  $(window).on("popstate", function(e) {
    if (e.originalEvent.state !== null) {
      loadPage(location.href);
    }
  });

  $(document).on("click", "a, area", function() {
    var href = $(this).attr("href");
    
    $('.current').removeClass('current');
    $(this).addClass('current');

    if (href.indexOf(document.domain) > -1
      || href.indexOf(':') === -1)
    {
      history.pushState({}, '', href);
      loadPage(href);
      return false;
    }
  });
  
  $(window).on({
  	'ajaxpage.loaded': function(){
  		console.log('evento: ajaxpage.loaded -  i contenuti sono stati caricati');
  	},
  	'ajaxpage.ready': function(){
  		console.log('evento: ajaxpage.ready -  il dom di pagina e con le sue funzioni custom è stato inizializzato');
  		},
  	'ajaxpage.load': function(){
  		console.log('evento: ajaxpage.load -  inizio a caricare i dati remoti');
  		}
  })
});

//VEDERE IL CODICE INSIEME E POI ANALIZZARE IL PROBLEMA:
/*
se clicco sul menù ho un cambio di contenuto e la voce cliccata si "illumina",
se uso le frecce sul browser invece il contenuto cambia ma il menù corrente no.

1 - scrivere il perchè questo accade indicando i numeri di riga relativi alla tesi esposta
[se eseguita correttamente vale 6/10]
2 - modificare il codice affinché il menù segni, al caricamento di pagina, il link corrente. Utilizzando le frecce del browser faccia la stessa cosa.
[vale 10/10 se eseguita correttamente alla domanda 1, altrimenti 6/10]
*/
