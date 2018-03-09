// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
;(function (){
  'use strict'
 $.fn.doButton = function(options = {}) {

      var settings = $.extend({
                init: {scaleX:0, x:'0%'},
                start: {scaleX:1,x:'0%',  ease:Expo.easeInOut},
                end: {scaleX:0, x:'100%',  ease:Expo.easeInOut},
                time: 0.75,
                urlDelay: 1,
                callBack: function(e){},
                callBackDelay: function(e){
                  window.location = $(e.currentTarget).attr('href');
                },
            }, options );

      return this.each(function(){

        this.bg  = $(this).find('.bg');
        this.tl = new TimelineMax({ paused: true });
        this.tl.set(this.bg, settings.init);
        this.tl.to(this.bg, settings.time, settings.start);
        this.tl.to(this.bg, settings.time, settings.end);

        $(this).on({
          mouseenter: function(){
            this.tl.play();
          },
          mouseleave: function(){
            this.tl.reverse();
          },
          click: function(e){
            e.preventDefault();
            $(window).trigger('urlChange');
            clearTimeout(this.timeout)
            settings.callBack(e);
            this.timeout = setTimeout(function(){ settings.callBackDelay(e); }, settings.urlDelay * 1000);
          }
        });

      });
  };
}());