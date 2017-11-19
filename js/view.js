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
          } else if (cell === 3) {
            $cell.addClass("flicker");
          }
          $grid.append($cell);
        });
      }
    });
  };

  var renderScore = function(score) {
    $(".score p").text(score);
  };

  var reRender = function reRender(grid, score) {
    this.clear();
    this.generateDivs(grid);
    this.renderScore(score);
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
    gameOver: gameOver,
    renderScore: renderScore
  }

})();