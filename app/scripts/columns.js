$(function(){

  $(".connectedSortable").sortable({

    axis: 'x',
    connectWith: ".connectedSortable",

    over: function(event, ui) {
      // console.log('over', event, ui);
    },
    receive: function(event, ui) {
      // console.log('receive', event, ui);
      // console.log($(ui.item).index());
    },
    update: function(event, ui) {
        var ul1 = $("#scrapbook li");
        var ul2 = $("#channel li");

        checkul1(ul1, ul2);
        checkul2(ul1, ul2);

        refreshWidths(listOfCollections);
    }
  }).disableSelection();


  listOfCollections.map(function(coll) {
    normalizeWidths(coll);
  });

});

var listOfCollections = ['scrapbook', 'channel'];

function checkul1(ul1, ul2) {
    if (ul1.length > 5) {
        ul1.last().prependTo(ul2.parent());
    }
}

function checkul2(ul1, ul2) {
    if (ul2.length > 5) {
        if (ul1.length < 5) {
            ul2.first().appendTo(ul1.parent());
        }
    }
}



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
  var fudge = 3;

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
  })
}