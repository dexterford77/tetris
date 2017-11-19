var T = T || {};

T.Controller = (function(board, view){

  var displaySpeed = 5;
  var gameSpeed = 200;
  var timeCounter = 0;
  var difficultyCounter = 0;
  var gameLoop;

  var init = function init() {
    view.init({
      playerControl: this.playerControl,
      startGame: this.startGame
    });
  };

  var startGame = function(initDiff) {
    gameSpeed = convertDiff(initDiff);
    board.init();
    var grid = board.getGrid();
    view.generateDivs(grid);
    board.addCurrentBlock();
    console.log(initDiff);
    gameLoop = setInterval(loop, displaySpeed);
  };

  var loop = function() {
    console.log(gameSpeed);
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
      difficultyCounter += 1;
      if (difficultyCounter === 50 && gameSpeed > 5) {
        gameSpeed -= 5;
        difficultyCounter = -1;
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
    clearInterval(gameLoop);
    view.gameOver();
    board.reset();
    timeCounter = 0;
    difficultyCounter = 0;
  };

  var convertDiff = function(initDiff) {
    initDiff = parseInt(initDiff);
    if (initDiff === 1) {
      return 250
    } else if (initDiff === 2) {
      return 200
    } else if (initDiff === 3) {
      return 150
    } else if (initDiff === 4) {
      return 120
    } else if (initDiff === 5) {
      return 100
    } else if (initDiff === 6) {
      return 80
    } else if (initDiff === 7) {
      return 60
    } else if (initDiff === 8) {
      return 40
    } else if (initDiff === 9) {
      return 20
    }
  };

  return {
    init: init,
    playerControl: playerControl,
    startGame: startGame,
    gameOver: gameOver,
    convertDiff: convertDiff
  }

})(T.Board, T.View);

// $(document).ready shorthand
$(function() {
  T.Controller.init();
});