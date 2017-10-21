var T = T || {};

T.Controller = (function(board, view){

  var init = function init() {
    console.log("Initializing...");
    board.init();
    var grid = board.getGrid();
    view.init(grid, {
      playerControl: this.playerControl
    });
    board.addCurrentBlock();
    setInterval(this.gameLoop, 600);
  };

  var gameLoop = function() {
    view.reRender(board.getGrid());
    if (board.floorCollide() !== true && board.pileCollide() !== true) {
      board.blockFall();
    } else {
      board.collision();
    }
  };

  var playerControl = function(e) {
    if (e.which === 37) {
      board.moveHoriz(-1);
    } else if (e.which === 39) {
      board.moveHoriz(1);
    } else if (e.which === 40) {
      if (board.floorCollide() !== true && board.pileCollide() !== true) {
        board.moveDown();
      } else {
        board.collision();
      }
    }
    view.reRender(board.getGrid());
  };

  return {
    init: init,
    playerControl: playerControl,
    gameLoop: gameLoop
  }

})(T.Board, T.View);

// $(document).ready shorthand
$(function() {
  T.Controller.init();
});