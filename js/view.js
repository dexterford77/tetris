var T = T || {};

T.View = (function() {

  var init = function(grid, callbacks) {
    this.generateDivs(grid);
    $(document).on("keydown", callbacks.playerControl);
  };

  var generateDivs = function(grid) {
    var $grid = $(".grid");
    grid.forEach(function(row, rIndex) {
      if (rIndex > 3) {
        row.forEach(function(cell, cIndex) {
          var $cell = $("<div>").addClass("cell").attr({
            "data-cell": cIndex,
            "data-row": rIndex
          });
          if (cell === 1) {
            $cell.addClass('block');
          } else if (cell === 2) {
            $cell.addClass("pile");
          }
          $grid.append($cell);
        });
      }
    });
  };

  var reRender = function reRender(grid) {
    this.clear();
    this.generateDivs(grid);
  };

  var clear = function clear() {
    var $cells = $(".cell");
    $cells.remove();
  };

  return {
    init: init,
    generateDivs: generateDivs,
    reRender: reRender,
    clear: clear
  }

})();