var T = T || {};

T.View = (function() {

  var init = function(callbacks) {
    $(document).on("keydown", callbacks.playerControl);
    $('#play-button').click(function(e) {
      $(e.target).parent('#message').hide();
      callbacks.startGame();
    })
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

  var gameOver = function() {
    clear();
    $('#message').show();
  };

  return {
    init: init,
    generateDivs: generateDivs,
    reRender: reRender,
    clear: clear,
    gameOver: gameOver
  }

})();