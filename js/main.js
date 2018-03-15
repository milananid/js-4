;(function (){
  'use strict'

  String.prototype.decodeHTML = function() {
    return $("<div>", {html: "" + this}).html();
  };

  var $main = $("#main"),

  init = function() {
    // Do this when a page loads.
    //** INIT BUTTON **//
    var selector = $('.stdBtn');
    if(selector.length > 0){
    	selector.doButton();
    }
  },

  ajaxLoad = function(html) {
    document.title = 'Loaded via Ajax:' + html
      .match(/<title>(.*?)<\/title>/)[1]
      .trim()
      .decodeHTML();

	$(window).trigger('ajaxpage.loaded');
    init();
    $(window).trigger('ajaxpage.ready');
  },

  loadPage = function(href) {
  	$(window).trigger('ajaxpage.load');

  	var checkUrl = window.location.pathname.split( '/' );
  	checkUrl = checkUrl[checkUrl.length-1];
  	$('nav .current').removeClass('current');
    $('nav a[href="'+checkUrl+'"]').addClass('current');

    $main.load(href + " #main>*", ajaxLoad);
  };

  init();

  $(window).on("popstate", function(e) {
    if (e.originalEvent.state !== null) {
      loadPage(location.href);
    }
  });

  $(document).on('click', 'a.ajax', function() {
    var href = $(this).attr("href");

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
}());


/***ESERCIZI
modificare lo script affinché al click su un link
con classe .ajax segua i seguenti task:
1 - crei un nuovo blocco #main-N
(dove N è un numero incrementale da 1 ad infinito)
2 - carichi l'url richiamata e ne inietti l'html
nel nuovo blocco inizializzandolo
3 - faccia uscire il vecchio main con un'animazione
da destra a sinistra
4 - allo stesso modo faccia entrare il nuovo
**/
/**Approfondimenti:
- SCROLL: cercare il metodo scrolltop()
e vedere cosa succede se lo si applica in un evento scroll
- IMAGE PRELOAD:
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
var img = new Image();   // Create new img element
img.addEventListener('load', function() {
  // execute drawImage statements here
}, false);
img.src = 'myImage.png'; // Set source path
**/
