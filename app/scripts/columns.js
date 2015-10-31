$(function(){

  $(".connectedSortable").sortable({
    appendTo: '#bridge',
    connectWith: ".connectedSortable",
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

    change: function(event, ui) {
      $(ui.placeholder).hide().show(80);
      // refreshWidths(listOfCollections);
    },
    over: function(event, ui) {

    },
    out: function(event, ui) {
      // var source = ui.sender.closest('.top-level').attr('id');
      // var target = $(this).closest('.top-level').attr('id');
    },
    receive: function(event, ui) {

    },
    start: function (event, ui) {
      // ui.item.toggleClass("highlight");
      $(ui.placeholder).hide(80);
    },
    stop: function (event, ui) {
      // ui.item.toggleClass("highlight");
    },
    update: function(event, ui) {
      refreshWidths(listOfCollections);
    }
  }).disableSelection();

  refreshWidths(listOfCollections);

});

var listOfCollections = ['scrapbook', 'channel'];



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
    value.width = normalizedWidth;
    // debugger;
    $(value).animate({ width: normalizedWidth }, 80);
  });
}

