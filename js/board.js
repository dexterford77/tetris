var T = T || {};

T.Board = (function() {

  var init = function init() {
    this.generateBoard();
  };

  var grid = [];

  var currentBlockCoords = {};

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
    var random = Math.floor(Math.random() * 10);
    currentBlockCoords = {
      x: random,
      y: 0
    };
    grid[currentBlockCoords.y][currentBlockCoords.x] = 1;
  };

  var blockFall = function blockFall() {
    var x = currentBlockCoords.x;
    var y = currentBlockCoords.y;
    grid[y][x] = 0;
    grid[y + 1][x] = 1;
    currentBlockCoords.y = y + 1;
  };

  var moveHoriz = function(direction) {
    var x = currentBlockCoords.x;
    var y = currentBlockCoords.y;
    var nextXValue = x + direction;
    if (nextXValue > -1 && nextXValue < 10 && grid[y][nextXValue] === 0) {
      grid[y][x + direction] = 1;
      grid[y][x] = 0;
      currentBlockCoords.x = x + direction;
    } 
  };

  var moveDown = function() {
    var x = currentBlockCoords.x;
    var y = currentBlockCoords.y;
    if (grid[y + 1][x] === 0) {
      grid[y][x] = 0;
      grid[y + 1][x] = 1;
      currentBlockCoords.y = y + 1;
    }
  };

  var floorCollide = function() {
    var x = currentBlockCoords.x;
    var y = currentBlockCoords.y;
    if (y + 1 > grid.length - 1) {
      return true
    } else {
      return false
    }
  };

  var pileCollide = function() {
    var x = currentBlockCoords.x;
    var y = currentBlockCoords.y;
    if (grid[y + 1][x] > 0) {
      return true
    } else {
      return false
    }
  };

  var blockHitsPile = function() {
    var x = currentBlockCoords.x;
    var y = currentBlockCoords.y;
    grid[y][x] = 2;
    currentBlockCoords = {};
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
        console.log(j);
        clearRow(j);
      }
    }
  };

  var collision = function() {
    blockHitsPile();
    checkRow();
    addCurrentBlock();
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
    collision: collision
  }

})();