$(function(){

  function listener(event, pointer) {
    var draggie = $(this).data('draggabilly');
    console.log(event.type, draggie.position.x, draggie.position.y );
    console.log('pointer', pointer);
  }

  $('.draggable').mouseup(function() {
    clearTimeout(pressTimer);
  }).mousedown(function (event) {
    pressTimer = window.setTimeout(function() {

      event.currentTarget.style.zIndex = ++event.currentTarget.style.zIndex || 1;

    }, 400);
    return false;
  });


  var $draggable = $('.draggable').draggabilly({

    containment: '.moodboard'

  });


  $draggable.on('dragMove', listener);


});