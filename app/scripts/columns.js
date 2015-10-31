$(function(){

  $(".collection").sortable({
    appendTo: '#bridge',
    connectWith: ".collection",
    cursor: "move",
    distance: 40,
    forcePlaceholderSize: true,
    helper: "clone",
    items: "> li",
    opacity: 0.8,
    placeholder: 'placeholder',
    revert: 100,
    scroll: false,
    tolerance: "intersect",
    zIndex: 9999,


    start: function (event, ui) {
      // ui.item.toggleClass("highlight");
      $(ui.placeholder).hide(80);
    },
    out: function(event, ui) {
      // console.log('out');
      dragging = !dragging;
      // console.log('out: dragging =', dragging);
    },
    change: function(event, ui) {
      $(ui.placeholder).hide().show(80);
    },
    over: function(event, ui) {
      // console.log('over');
      var source = $(this).closest('.top-level').attr('id');
      var target = $(this).data()['ui-sortable'].element.closest('.top-level').attr('id');
      if (dragging) {
        reduceListSize(target);
      }
    },
    receive: function(event, ui) {
      // console.log('receive');
      dragging = !dragging;
      // console.log('receive: dragging =', dragging);
    },
    stop: function (event, ui) {
      // ui.item.toggleClass("highlight");
      dragging = false;
      console.log('stop: dragging =', dragging);
      refreshWidths(listOfCollections);
    },
    update: function(event, ui) {
      // refreshWidths(listOfCollections);
    }
  }).disableSelection();

  refreshWidths(listOfCollections);

});



var listOfCollections = ['scrapbook', 'channel'];
var dragging = false;


/**
 * Redistribute width and height of all collections in list
 * @param list - list of ids parent div of the collection
 */
function refreshWidths(list) {
  list.map(function(coll) {
    normalizeWidths(coll);
  });
}

/**
 * Redistribute width and height of images within a collection
 * @param collectionId - id of parent div of the collection
 */
function normalizeWidths(id) {
  var fudge = 1; // for border width

  // 1. find all images
  var assets = $('#' + id + ' .collection img');
  // console.log(id, 'has', assets.length, 'assets');

  // 2. find width of collection
  var collectionWidth = $('#' + id + ' .wrapper').width();
  var normalizedWidth = collectionWidth / assets.length - fudge;
  // console.log('normalizedWidth', normalizedWidth);

  // 3. set all image widths to normalized
  assets.each(function (key, value) {
    $(value).animate({ width: normalizedWidth }, 80);
  });
}


function reduceListSize(id) {
  if (dragging) {
    // console.log('REDUCE LIST SIZE', id);

    var factor = 2; // pretend dealing w/ more elements to fit on one line

    // 1. find all images
    var assets = $('#' + id + ' .collection img');

    // 2. find width of collection
    var collectionWidth = $('#' + id + ' .wrapper').width();
    var normalizedWidth = collectionWidth / (assets.length + factor);

    // 3. set all image widths to normalized
    assets.each(function (key, value) {
      $(value).animate({ width: normalizedWidth }, 80);
    });
  }
}

