var T = T || {};

T.Controller = (function(board, view){

  var speed = 200;

  var init = function init() {
    view.init({
      playerControl: this.playerControl,
      startGame: this.startGame
    });
  };

  var startGame = function() {
    board.init();
    var grid = board.getGrid();
    view.generateDivs(grid);
    board.addCurrentBlock();
    var gameLoop = setInterval(loop, speed);
  };

  var loop = function() {
    view.reRender(board.getGrid());
    if (board.floorCollide() !== true && board.pileCollide() !== true) {
      board.blockFall();
    } else {
      board.collision({
        gameOver: gameOver
      });
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
        board.collision({
          gameOver: gameOver
        });
      }
    }
  };

  var gameOver = function() {
    console.log("GAME OVER!");
    view.gameOver();
    board.reset();
    clearInterval(gameLoop);
  };

  return {
    init: init,
    playerControl: playerControl,
    startGame: startGame,
    gameOver: gameOver
  }

})(T.Board, T.View);

// $(document).ready shorthand
$(function() {
  T.Controller.init();
});