var T = T || {};

T.Controller = (function(board, view){

  var displaySpeed = 5;
  var gameSpeed = 200;
  var timeCounter = 0;

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
    var gameLoop = setInterval(loop, displaySpeed);
  };

  var loop = function() {
    board.runChecks();
    view.reRender(board.getGrid(), board.getScore());
    if (timeCounter === gameSpeed) {
      if (board.floorCollide() !== true && board.pileCollide() !== true) {
        board.blockFall();
      } else {
        board.collision({
          gameOver: gameOver
        });
      }
      timeCounter = 0;
    }
    timeCounter += displaySpeed;
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
    } else if (e.which === 90) {
      // counterclockwise
      board.rotate(-1);
    } else if (e.which === 88) {
      // clockwise
      board.rotate(1);
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