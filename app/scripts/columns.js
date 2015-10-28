$(function(){

  $(".item").draggable().selectable();

  $("#scrapbook").droppable({
    drop: function(event, ui) {

      var asset = ui.draggable[0].id;
      var origin = $('#'+asset).parent().parent().attr('id');
      var dest = event.target.id;

      migrateAsset(asset, dest);

      refreshCollection(origin);
      refreshCollection(dest);
    }
  });

  $("#channel").droppable({
    drop: function(event, ui) {

      var asset = ui.draggable[0].id;
      var origin = $('#'+asset).parent().parent().attr('id');
      var dest = event.target.id;

      migrateAsset(asset, dest);

      refreshCollection(origin);
      refreshCollection(dest);
    }
  });


  /**
   * Migrates one asset (e.g. image) from one container (e.g. div) to another
   * @param asset - id of asset (e.g. image) being moved
   * @param to - id of destination droppable collection
   */
  function migrateAsset(asset, to) {

    // TODO:handle multiple selects
    $('#' + asset).detach().appendTo('#' + to + ' .collection');
  }

  /**
   * Redistribute width and height of images within a collection
   * @param collectionId - id of parent div of the collection
   */
  function refreshCollection(id) {
    var fudge = 3;

    console.log(id, 'has', sizeOf(id), 'items');

    var collectionHeight = $('#' + id + ' .collection').height();
    var collectionWidth = $('#' + id + ' .collection').width();
    var expectedWidthPerAsset = collectionWidth / sizeOf(id);

    var assets = $('#' + id + ' .collection img');

    var assetIds = [], widthRatios = [];
    assets.each(function (key, value) {
      var aid = $(value).attr('id'); assetIds.push(aid);
      var assetWidth = $('#'+aid).width();
      var assetHeight = $('#'+aid).height();
      var widthInTermsOfHeight = assetWidth / assetHeight;

      // 1. make the height of all images arbitrarily small (same height)
      $('#'+aid).height(collectionHeight);
      // 2. calculate their widths and assign a ratio out of entire collection width
      widthRatios.push(assetHeight * widthInTermsOfHeight / collectionWidth);
    });

    // 3. unset the height, set to new widths
    assetIds.forEach(function (value, key) {
      // set new widths to each element
      $('#' + value).width(widthRatios[key] * collectionWidth);

      $('#' + value).detach().appendTo('#' + id + ' .collection');
    });

  }

  /**
   * Returns size of a collection
   * @param id - id of parent div of the collection
   */
  function sizeOf(id) {
    return $('#' + id + ' .collection img').length;
  }

});