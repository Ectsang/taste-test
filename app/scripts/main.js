$(function(){

  var elems = ["#one", "#two", "#three", "#four"];

  elems.forEach(function (elem) {
    var alsoResizeStr = elem + ' img, ' + elem + ' iframe, ' + elem + ' draghandle';
    $(elem)
      .rotatable({
        start: function(event, ui) {
          console.log('start', ui.angle);
        },
        rotate: function(event, ui) {
        },
        stop: function(event, ui) {
          console.log('stop', ui.angle);
        }
    })
    .resizable({
      aspectRatio: true,
      handles: "se",
      containment: "parent",
      alsoResize: alsoResizeStr,
      minWidth: 150,
      minHeight: 150,
      start: function(event, ui) {
        console.log('start', ui.size);
      },
      stop: function(event, ui) {
        console.log('stop', ui.size);
      }
    })
    .draggable({
      iframeFix: true,
      stack: ".asset",
      start: function(event, ui) {
        console.log('start', ui.position);
      },
      stop: function(event, ui) {
        console.log('stop', ui.position);
      }
    });
  });


});