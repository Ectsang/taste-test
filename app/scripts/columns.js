$(function(){

  $(".collection").sortable({
    appendTo: '#bridge',
    connectWith: ".collection",
    cursor: "move",
    distance: 30,
    // forcePlaceholderSize: true,
    helper: "clone",
    items: "> li",
    opacity: 0.8,
    // placeholder: 'placeholder',
    revert: 100,
    scroll: false,
    tolerance: "intersect",
    zIndex: 9999,


    start: function (event, ui) {
      ui.item.toggleClass("placeholder");
      // $(ui.placeholder).hide(80);
      // console.log('start', $(ui.item));
      var source = $(this).closest('.top-level').attr('id');
      var count = countAssets(source);
      console.log('start', source, count);

      preConfigWidths(source, count - 1);
      $(this).sortable('refreshPositions');
    },
    change: function(event, ui) {
      // $(ui.placeholder).hide().show(80);
      // refreshWidths(listOfCollections);
      var target = $(this).closest('.top-level').attr('id');
      console.log('change', target);
    },
    out: function(event, ui) {
      // var source = ui.sender.closest('.top-level').attr('id');
      // var target = $(this).closest('.top-level').attr('id');

    },
    over: function(event, ui) {

    },
    receive: function(event, ui) {

    },
    stop: function (event, ui) {
      ui.item.toggleClass("placeholder");

    },
    update: function(event, ui) {
      refreshWidths(listOfCollections);
    }
  }).disableSelection();

  refreshWidths(listOfCollections);

});




var listOfCollections = [
  'scrapbook1', 'scrapbook2',
  'channel1', 'channel2',
  'folders'];


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



function countAssets(id) {
  var assets = $('#' + id + ' .collection img');
  return assets.length;
}

function preConfigWidths(id, count) {
  var fudge = 1;
  var assets = $('#' + id + ' .collection img');
  var collectionWidth = $('#' + id + ' .wrapper').width();
  var normalizedWidth = collectionWidth / count - fudge;
  assets.each(function (key, value) {
    value.width = normalizedWidth;
    $(value).animate({ width: normalizedWidth }, 80);
  });
}

function hintOn(id) {
  $(id).addClass('hint');
}

