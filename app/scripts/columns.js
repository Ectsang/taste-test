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
      // ui.item.toggleClass("placeholder");
      // $(ui.placeholder).hide(80);// console.log('start', $(ui.item));
      // var source = $(this).closest('.top-level').attr('id');
      // var count = countAssets(source);
      // console.log('start', source, count);
      // preConfigWidths(source, count - 1);
      // $(this).sortable('refreshPositions');
    },
    change: function(event, ui) {
      // $(ui.placeholder).hide().show(80);
      // refreshWidths(listOfCollections);
      var target = $(this).closest('.top-level').attr('id');

      console.log('change', target, 'dragging', dragging);
      if (target !== dragging) {
        dragging = false;
        hintOn(target);
      }
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
      // ui.item.toggleClass("placeholder");
      $('.hint').each(function(key, value) {
        $(value).detach();
      });
    },
    update: function(event, ui) {
      refreshWidths(listOfCollections);
    }
  }).disableSelection();

});




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

  var imageWidths = [], imageHeights = [],
      unifiedWidths = [], widthRatios = [],
      fudge = 2; // for border width

  // 1. find width of collection
  var collectionWidth = $('#' + id + ' .wrapper').width();

  // 2. find all images and get unifiedWidths
  var assets = $('#' + id + ' .collection img');
  for (var i = 0, len = assets.length; i < len; i++) {
    var value = assets[i];
    // console.log('width', $(value).width(), 'height', $(value).height());
    var w = $(value).width(), h = $(value).height();
    imageWidths.push(w); imageHeights.push(h);

    // console.log(id, i, w, h);

    unifiedWidths.push( getWidthOnUnifiedHeight(w, h) );
  };

  // 3. sum unifiedWidths into denominator, get relative widthRatios
  var denom = unifiedWidths.reduce(function(a, b) { return a + b; }, 0);
  for (var i = 0, len = assets.length; i < len; i++) {

    widthRatios.push(unifiedWidths[i] / denom);
  }

  // 4. i) set each image widths according to (width ratio x collectionWidth),
  //    ii) force height to be same as first
  var trueHeight;
  for (var i = 0, len = assets.length; i < len; i++) {
    var trueWidth = widthRatios[i] * collectionWidth - fudge;

    // We define trueHeight once to keep all images on same row exactly same height
    if (!trueHeight) {
      // trueWidth = w2 = 10 * (w1 / h1) = 10 * Aspect Ratio
      // w2 * (1 / Aspect Ratio) = w2 * (h1/w1) = h2 = trueHeight
      trueHeight = trueWidth * (imageHeights[i] / imageWidths[i]);
    }

    $(assets[i]).animate({ width: trueWidth, height: trueHeight }, 60);
  }

}

/**
 * Returns the widths with unified heights
 * @param w1 - image width
 * @param h1 - image height
 */
function getWidthOnUnifiedHeight(w1, h1) {
  // if made same height (10px), keeping aspect ratio, what's the width?
  var w2 = SMALL_HEIGHT * w1 / h1;
  return w2; // return { w: trueWidth, h: trueHeight };
}


/**
 * Returns number of assets in the collection
 * @param id - id of parent of collection
 */
function countAssets(id) {
  var assets = $('#' + id + ' .collection img');
  return assets.length;
}

// function preConfigWidths(id, count) {
//   var fudge = 1;
//   var assets = $('#' + id + ' .collection img');
//   var collectionWidth = $('#' + id + ' .wrapper').width();
//   var normalizedWidth = collectionWidth / count - fudge;
//   assets.each(function (key, value) {
//     value.width = normalizedWidth;
//     $(value).animate({ width: normalizedWidth }, 80);
//   });
// }

/**
 * Draws a same sized translucent div on top of hovering zone
 * @param id - id of zone
 */
function hintOn(id) {
  // remove all other hints
  if (!dragging) {
    $('.hint').each(function(key, value) {
      $(value).detach();
    });
  }
  var selector = '#' + id + ' .collection li';
  var w = $(selector).closest('ul').width();
  var h = $(selector).closest('ul').height();
  var pos = $(selector).closest('ul').position();
  var hint = '<div id="theHint" class="hint" style="top:'+
      pos.top+';left:'+pos.left+';width:'+w+'px;height:'+h+'px">&nbsp;</div>';

  $(selector).closest('ul').prepend(hint);
  dragging = id;
}


///////////////////////////////////////////////////////////////////////////////

var listOfCollections = [
  'scrapbook1', 'scrapbook2',
  'channel1', 'channel2',
  'folder1', 'folder2', 'folder3'
];

var SMALL_HEIGHT = 100;

var dragging = false;

refreshWidths(listOfCollections);

