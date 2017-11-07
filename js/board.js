var T = T || {};

T.Board = (function() {

  var init = function init() {
    this.generateBoard();
  };

  const blockTypes = ["square", "bar", "L", "S"];
  var currentBlock = [];
  var currentBlockType = "";
  var currentBlockRotation = 0;
  var grid = [];

  var getGrid = function(){
    return grid;
  };

  var generateBoard = function() {
    for (var row = 0; row < 24; row++) {
      var rowArray = [];
      for (var col = 0; col < 10; col++) {
        rowArray.push(0);
      }
      grid.push(rowArray);
    }
  };

  var addCurrentBlock = function addCurrentBlock() {
    currentBlockRotation = 0;
    // currentBlockType = blockTypes[Math.floor(Math.random() * blockTypes.length)];
    currentBlockType = "S";
    createBlock(currentBlockType);
    for (i = 0; i < currentBlock.length; i++) {
      grid[currentBlock[i][1]][currentBlock[i][0]] = 1;
    }
  };

  var createBlock = function(blockType) {
    var random;
    if (blockType === "square") {
      // gets random # btwn 0-8
      random = Math.floor(Math.random() * 9);
      currentBlock = [
        [random, 0],
        [random + 1, 0],
        [random, 1],
        [random + 1, 1]
      ]
    } else if (blockType === "bar") {
      // gets random # btwn 0-9
      random = Math.floor(Math.random() * 10);
      currentBlock = [
        [random, 0],
        [random, 1],
        [random, 2],
        [random, 3]
      ]
    } else if (blockType === "L") {
      // gets random # btwn 0-8
      random = Math.floor(Math.random() * 9);
      currentBlock = [
        [random, 0],
        [random, 1],
        [random, 2],
        [random + 1, 2]
      ]
    } else if (blockType === "S") {
      // gets random # btwn 0-8
      random = Math.floor(Math.random() * 9);
      currentBlock = [
        [random, 0],
        [random, 1],
        [random + 1, 1],
        [random + 1, 2]
      ]
    }
  };

  var blockFall = function blockFall() {

    grid[currentBlock[0][1]][currentBlock[0][0]] = 0;
    grid[currentBlock[1][1]][currentBlock[1][0]] = 0;
    grid[currentBlock[2][1]][currentBlock[2][0]] = 0;
    grid[currentBlock[3][1]][currentBlock[3][0]] = 0;

    currentBlock[0][1] += 1;
    currentBlock[1][1] += 1;
    currentBlock[2][1] += 1;
    currentBlock[3][1] += 1;
    
    grid[currentBlock[0][1]][currentBlock[0][0]] = 1;
    grid[currentBlock[1][1]][currentBlock[1][0]] = 1;
    grid[currentBlock[2][1]][currentBlock[2][0]] = 1;
    grid[currentBlock[3][1]][currentBlock[3][0]] = 1;
  };

  var moveHoriz = function(direction) {
    if ((currentBlock[0][0]+direction > -1) && (currentBlock[1][0]+direction > -1) && (currentBlock[2][0]+direction > -1) && (currentBlock[3][0]+direction > -1) && (currentBlock[0][0]+direction < 10) && (currentBlock[1][0]+direction < 10) && (currentBlock[2][0]+direction < 10) && (currentBlock[3][0]+direction < 10) && (grid[currentBlock[0][1]][currentBlock[0][0]+direction] !== 2) && (grid[currentBlock[1][1]][currentBlock[1][0]+direction] !== 2) && (grid[currentBlock[2][1]][currentBlock[2][0]+direction] !== 2) && (grid[currentBlock[3][1]][currentBlock[3][0]+direction] !== 2)) {

      grid[currentBlock[0][1]][currentBlock[0][0]] = 0;
      grid[currentBlock[1][1]][currentBlock[1][0]] = 0;
      grid[currentBlock[2][1]][currentBlock[2][0]] = 0;
      grid[currentBlock[3][1]][currentBlock[3][0]] = 0;

      currentBlock[0][0] += direction;
      currentBlock[1][0] += direction;
      currentBlock[2][0] += direction;
      currentBlock[3][0] += direction;

      grid[currentBlock[0][1]][currentBlock[0][0]] = 1;
      grid[currentBlock[1][1]][currentBlock[1][0]] = 1;
      grid[currentBlock[2][1]][currentBlock[2][0]] = 1;
      grid[currentBlock[3][1]][currentBlock[3][0]] = 1;
    }
  };

  var moveDown = function() {
    if ((grid[currentBlock[0][1]+1][currentBlock[0][0]] === 0) || (grid[currentBlock[1][1]+1][currentBlock[1][0]] === 0) || (grid[currentBlock[2][1]+1][currentBlock[2][0]] === 0) || (grid[currentBlock[3][1]+1][currentBlock[3][0]]) === 0) {
      
      grid[currentBlock[0][1]][currentBlock[0][0]] = 0;
      grid[currentBlock[1][1]][currentBlock[1][0]] = 0;
      grid[currentBlock[2][1]][currentBlock[2][0]] = 0;
      grid[currentBlock[3][1]][currentBlock[3][0]] = 0;

      currentBlock[0][1] += 1;
      currentBlock[1][1] += 1;
      currentBlock[2][1] += 1;
      currentBlock[3][1] += 1;
      
      grid[currentBlock[0][1]][currentBlock[0][0]] = 1;
      grid[currentBlock[1][1]][currentBlock[1][0]] = 1;
      grid[currentBlock[2][1]][currentBlock[2][0]] = 1;
      grid[currentBlock[3][1]][currentBlock[3][0]] = 1;
    }
  };

  var rotate = function(direction) {
    if (currentBlockType === "L") {

      if (currentBlockRotation === 0) {

        grid[currentBlock[0][1]][currentBlock[0][0]] = 0;
        grid[currentBlock[1][1]][currentBlock[1][0]] = 0;
        grid[currentBlock[2][1]][currentBlock[2][0]] = 0;
        grid[currentBlock[3][1]][currentBlock[3][0]] = 0;

        currentBlock[0][0] += direction;
        currentBlock[0][1] += 1;
        currentBlock[2][0] -= direction;
        currentBlock[2][1] -= 1;
        if (direction === -1) {
          currentBlock[3][1] -= 2;
        } else if (direction === 1) {
          currentBlock[3][0] -= 2;
        }

        grid[currentBlock[0][1]][currentBlock[0][0]] = 1;
        grid[currentBlock[1][1]][currentBlock[1][0]] = 1;
        grid[currentBlock[2][1]][currentBlock[2][0]] = 1;
        grid[currentBlock[3][1]][currentBlock[3][0]] = 1;

        currentBlockRotation += direction;
        if (currentBlockRotation === -1) {
          currentBlockRotation = 3;
        }

      } else if (currentBlockRotation === 1) {

        grid[currentBlock[0][1]][currentBlock[0][0]] = 0;
        grid[currentBlock[1][1]][currentBlock[1][0]] = 0;
        grid[currentBlock[2][1]][currentBlock[2][0]] = 0;
        grid[currentBlock[3][1]][currentBlock[3][0]] = 0;

        currentBlock[0][0] -= 1;
        currentBlock[0][1] += direction;
        currentBlock[2][0] += 1;
        currentBlock[2][1] -= direction;
        if (direction === -1) {
          currentBlock[3][0] += 2;
        } else if (direction === 1) {
          currentBlock[3][1] -= 2;
        }

        grid[currentBlock[0][1]][currentBlock[0][0]] = 1;
        grid[currentBlock[1][1]][currentBlock[1][0]] = 1;
        grid[currentBlock[2][1]][currentBlock[2][0]] = 1;
        grid[currentBlock[3][1]][currentBlock[3][0]] = 1;

        currentBlockRotation += direction;

      } else if (currentBlockRotation === 2) {

        grid[currentBlock[0][1]][currentBlock[0][0]] = 0;
        grid[currentBlock[1][1]][currentBlock[1][0]] = 0;
        grid[currentBlock[2][1]][currentBlock[2][0]] = 0;
        grid[currentBlock[3][1]][currentBlock[3][0]] = 0;

        currentBlock[0][0] -= direction;
        currentBlock[0][1] -= 1;
        currentBlock[2][0] += direction;
        currentBlock[2][1] += 1;
        if (direction === -1) {
          currentBlock[3][1] += 2;
        } else if (direction === 1) {
          currentBlock[3][0] += 2;
        }

        grid[currentBlock[0][1]][currentBlock[0][0]] = 1;
        grid[currentBlock[1][1]][currentBlock[1][0]] = 1;
        grid[currentBlock[2][1]][currentBlock[2][0]] = 1;
        grid[currentBlock[3][1]][currentBlock[3][0]] = 1;

        currentBlockRotation += direction;

      } else if (currentBlockRotation === 3) {

        grid[currentBlock[0][1]][currentBlock[0][0]] = 0;
        grid[currentBlock[1][1]][currentBlock[1][0]] = 0;
        grid[currentBlock[2][1]][currentBlock[2][0]] = 0;
        grid[currentBlock[3][1]][currentBlock[3][0]] = 0;

        currentBlock[0][0] += 1;
        currentBlock[0][1] -= direction;
        currentBlock[2][0] -= 1;
        currentBlock[2][1] += direction;
        if (direction === -1) {
          currentBlock[3][0] -= 2;
        } else if (direction === 1) {
          currentBlock[3][1] += 2;
        }

        grid[currentBlock[0][1]][currentBlock[0][0]] = 1;
        grid[currentBlock[1][1]][currentBlock[1][0]] = 1;
        grid[currentBlock[2][1]][currentBlock[2][0]] = 1;
        grid[currentBlock[3][1]][currentBlock[3][0]] = 1;

        currentBlockRotation += direction;
        if (currentBlockRotation === 4) {
          currentBlockRotation = 0;
        }

      }

    } else if (currentBlockType = "S") {

      if (currentBlockRotation === 0) {

        grid[currentBlock[0][1]][currentBlock[0][0]] = 0;
        grid[currentBlock[1][1]][currentBlock[1][0]] = 0;
        grid[currentBlock[2][1]][currentBlock[2][0]] = 0;
        grid[currentBlock[3][1]][currentBlock[3][0]] = 0;

        if (direction === 1) {
          currentBlock[0][0] += 2;
        } else if (direction === -1) {
          currentBlock[0][1] += 2;
        }
        currentBlock[1][0] += 1;
        currentBlock[1][1] -= direction;
        currentBlock[3][0] -= direction;
        currentBlock[3][1] -= 1;

        grid[currentBlock[0][1]][currentBlock[0][0]] = 1;
        grid[currentBlock[1][1]][currentBlock[1][0]] = 1;
        grid[currentBlock[2][1]][currentBlock[2][0]] = 1;
        grid[currentBlock[3][1]][currentBlock[3][0]] = 1;

        currentBlockRotation += direction;
        if (currentBlockRotation === -1) {
          currentBlockRotation = 3;
        }

      } else if (currentBlockRotation === 1) {

        grid[currentBlock[0][1]][currentBlock[0][0]] = 0;
        grid[currentBlock[1][1]][currentBlock[1][0]] = 0;
        grid[currentBlock[2][1]][currentBlock[2][0]] = 0;
        grid[currentBlock[3][1]][currentBlock[3][0]] = 0;

        if (direction === 1) {
          currentBlock[0][1] += 2;
        } else if (direction === -1) {
          currentBlock[0][0] -= 2;
        }
        currentBlock[1][0] += direction;
        currentBlock[1][1] += 1;
        currentBlock[3][0] += 1;
        currentBlock[3][1] -= direction;

        grid[currentBlock[0][1]][currentBlock[0][0]] = 1;
        grid[currentBlock[1][1]][currentBlock[1][0]] = 1;
        grid[currentBlock[2][1]][currentBlock[2][0]] = 1;
        grid[currentBlock[3][1]][currentBlock[3][0]] = 1;

        currentBlockRotation += direction;

      } else if (currentBlockRotation === 2) {

        grid[currentBlock[0][1]][currentBlock[0][0]] = 0;
        grid[currentBlock[1][1]][currentBlock[1][0]] = 0;
        grid[currentBlock[2][1]][currentBlock[2][0]] = 0;
        grid[currentBlock[3][1]][currentBlock[3][0]] = 0;

        if (direction === 1) {
          currentBlock[0][0] -= 2;
        } else if (direction === -1) {
          currentBlock[0][1] -= 2;
        }
        currentBlock[1][0] -= 1;
        currentBlock[1][1] += direction;
        currentBlock[3][0] += direction;
        currentBlock[3][1] += 1;

        grid[currentBlock[0][1]][currentBlock[0][0]] = 1;
        grid[currentBlock[1][1]][currentBlock[1][0]] = 1;
        grid[currentBlock[2][1]][currentBlock[2][0]] = 1;
        grid[currentBlock[3][1]][currentBlock[3][0]] = 1;

        currentBlockRotation += direction;

      } else if (currentBlockRotation === 3) {

        grid[currentBlock[0][1]][currentBlock[0][0]] = 0;
        grid[currentBlock[1][1]][currentBlock[1][0]] = 0;
        grid[currentBlock[2][1]][currentBlock[2][0]] = 0;
        grid[currentBlock[3][1]][currentBlock[3][0]] = 0;

        if (direction === 1) {
          currentBlock[0][1] -= 2;
        } else if (direction === -1) {
          currentBlock[0][0] += 2;
        }
        currentBlock[1][0] -= direction;
        currentBlock[1][1] -= 1;
        currentBlock[3][0] -= 1;
        currentBlock[3][1] += direction;

        grid[currentBlock[0][1]][currentBlock[0][0]] = 1;
        grid[currentBlock[1][1]][currentBlock[1][0]] = 1;
        grid[currentBlock[2][1]][currentBlock[2][0]] = 1;
        grid[currentBlock[3][1]][currentBlock[3][0]] = 1;

        currentBlockRotation += direction;
        if (currentBlockRotation === 4) {
          currentBlockRotation = 0;
        }

      }

    } else if (currentBlockType = "bar") {

    }
  };

  var floorCollide = function() {
    if ((currentBlock[0][1] > grid.length-2) || (currentBlock[1][1] > grid.length-2) || (currentBlock[2][1] > grid.length-2) || (currentBlock[3][1] > grid.length-2)) {
      return true
    } else {
      return false
    }
  };

  var pileCollide = function() {
    if ((grid[currentBlock[0][1]+1][currentBlock[0][0]] === 2) || (grid[currentBlock[1][1]+1][currentBlock[1][0]] === 2) || (grid[currentBlock[2][1]+1][currentBlock[2][0]] === 2) || (grid[currentBlock[3][1]+1][currentBlock[3][0]]) === 2) {
      return true
    } else {
      return false
    }
  };

  var blockHitsPile = function() {
    grid[currentBlock[0][1]][currentBlock[0][0]] = 2;
    grid[currentBlock[1][1]][currentBlock[1][0]] = 2;
    grid[currentBlock[2][1]][currentBlock[2][0]] = 2;
    grid[currentBlock[3][1]][currentBlock[3][0]] = 2;
    currentBlock =  [];
  };

  var clearRow = function(rowCoord) {
    grid.splice(rowCoord, 1);
    grid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  };

  var checkRow = function() {
    var total = 0;
    for (j = 0; j < grid.length; j++) {
      var total = grid[j].reduce(function(sum, val){
        return sum + val
      });
      if (total === 20) {
        clearRow(j);
      }
    }
  };

  var collision = function(callbacks) {
    blockHitsPile();
    checkGameOver(callbacks);
    checkRow();
    addCurrentBlock();
  };

  var checkGameOver = function(callbacks) {
    for (i=0; i < 10; i++) {
      if (grid[3][i] === 2) {
        callbacks.gameOver();
      }
    }
  };

  var reset = function() {
    grid = [];
    currentBlock = [];
  };

  return {
    init: init,
    getGrid: getGrid,
    generateBoard: generateBoard,
    addCurrentBlock: addCurrentBlock,
    blockFall: blockFall,
    moveHoriz: moveHoriz,
    floorCollide: floorCollide,
    moveDown: moveDown,
    pileCollide: pileCollide,
    collision: collision,
    checkGameOver: checkGameOver,
    reset: reset,
    rotate: rotate
  }
})();