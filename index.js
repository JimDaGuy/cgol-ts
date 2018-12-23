{
    // Canvas Dimensions
    var canvasWidth_1 = 1000;
    var canvasHeight_1 = 500;
    var squareWidth_1 = 25;
    var lineWidth_1 = 2;
    var numHorCells_1 = canvasWidth_1 / squareWidth_1;
    var numVertCells_1 = canvasHeight_1 / squareWidth_1;
    var lineColor_1 = 'black';
    var deadColor_1 = 'green';
    var aliveColor_1 = 'red';
    var h1 = document.createElement('h1');
    h1.style.textAlign = 'center';
    h1.style.margin = '20px 0';
    h1.innerHTML = 'Conway\'s Game of Life - <a href="https://github.com/JimDaGuy/cgol-ts">JimDaGuy</a>';
    document.body.append(h1);
    var canvas_1 = document.createElement('canvas');
    canvas_1.width = canvasWidth_1;
    canvas_1.height = canvasHeight_1;
    canvas_1.style.clear = 'both';
    canvas_1.style.margin = "20px calc(50% - " + canvasWidth_1 / 2 + "px)";
    document.body.append(canvas_1);
    var ctx_1 = canvas_1.getContext('2d');
    /*
      Rules
      ==========================
      Any live cell with fewer than two live neighbors dies, as if by underpopulation.
      Any live cell with two or three live neighbors lives on to the next generation.
      Any live cell with more than three live neighbors dies, as if by overpopulation.
      Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
    */
    // Create an empty object and copy the aliveCells values to it
    var createNewAlive_1 = function (currentAlive) {
        var newAlive = {};
        for (var x in currentAlive) {
            for (var y in currentAlive[x]) {
                if (x in newAlive) {
                    newAlive[x][y] = true;
                }
                else {
                    newAlive[x] = {};
                    newAlive[x][y] = true;
                }
            }
        }
        return newAlive;
    };
    // Custom setup
    var christmasSetup_1 = {};
    christmasSetup_1['17'] = {};
    christmasSetup_1['17']['12'] = true;
    christmasSetup_1['17']['13'] = true;
    christmasSetup_1['18'] = {};
    christmasSetup_1['18']['10'] = true;
    christmasSetup_1['18']['11'] = true;
    christmasSetup_1['18']['12'] = true;
    christmasSetup_1['18']['13'] = true;
    christmasSetup_1['19'] = {};
    christmasSetup_1['19']['8'] = true;
    christmasSetup_1['19']['9'] = true;
    christmasSetup_1['19']['10'] = true;
    christmasSetup_1['19']['11'] = true;
    christmasSetup_1['19']['12'] = true;
    christmasSetup_1['19']['13'] = true;
    christmasSetup_1['20'] = {};
    christmasSetup_1['20']['7'] = true;
    christmasSetup_1['20']['8'] = true;
    christmasSetup_1['20']['9'] = true;
    christmasSetup_1['20']['10'] = true;
    christmasSetup_1['20']['11'] = true;
    christmasSetup_1['20']['12'] = true;
    christmasSetup_1['20']['13'] = true;
    christmasSetup_1['21'] = {};
    christmasSetup_1['21']['6'] = true;
    christmasSetup_1['21']['7'] = true;
    christmasSetup_1['21']['8'] = true;
    christmasSetup_1['21']['9'] = true;
    christmasSetup_1['21']['10'] = true;
    christmasSetup_1['21']['11'] = true;
    christmasSetup_1['21']['12'] = true;
    christmasSetup_1['21']['13'] = true;
    christmasSetup_1['21']['14'] = true;
    christmasSetup_1['21']['15'] = true;
    christmasSetup_1['22'] = {};
    christmasSetup_1['22']['7'] = true;
    christmasSetup_1['22']['8'] = true;
    christmasSetup_1['22']['9'] = true;
    christmasSetup_1['22']['10'] = true;
    christmasSetup_1['22']['11'] = true;
    christmasSetup_1['22']['12'] = true;
    christmasSetup_1['22']['13'] = true;
    christmasSetup_1['23'] = {};
    christmasSetup_1['23']['8'] = true;
    christmasSetup_1['23']['9'] = true;
    christmasSetup_1['23']['10'] = true;
    christmasSetup_1['23']['11'] = true;
    christmasSetup_1['23']['12'] = true;
    christmasSetup_1['23']['13'] = true;
    christmasSetup_1['24'] = {};
    christmasSetup_1['24']['10'] = true;
    christmasSetup_1['24']['11'] = true;
    christmasSetup_1['24']['12'] = true;
    christmasSetup_1['24']['13'] = true;
    christmasSetup_1['25'] = {};
    christmasSetup_1['25']['12'] = true;
    christmasSetup_1['25']['13'] = true;
    var aliveCells_1 = createNewAlive_1(christmasSetup_1);
    var newAliveCells_1 = {};
    // Draw lines on the board
    var drawLines_1 = function () {
        ctx_1.strokeStyle = lineColor_1;
        ctx_1.lineWidth = lineWidth_1;
        var lineX = 0;
        for (var i = lineX; i <= canvasWidth_1; i += squareWidth_1) {
            ctx_1.beginPath();
            ctx_1.moveTo(i, 0);
            ctx_1.lineTo(i, canvasHeight_1);
            ctx_1.stroke();
        }
        var lineY = 0;
        for (var i = lineY; i <= canvasWidth_1; i += squareWidth_1) {
            ctx_1.beginPath();
            ctx_1.moveTo(0, i);
            ctx_1.lineTo(canvasWidth_1, i);
            ctx_1.stroke();
        }
    };
    // Iterate through alive cells and draw them
    var drawCells_1 = function () {
        ctx_1.fillStyle = deadColor_1;
        ctx_1.fillRect(0, 0, canvasWidth_1, canvasHeight_1);
        ctx_1.fillStyle = aliveColor_1;
        var xCells = Object.keys(aliveCells_1);
        for (var i = 0; i < xCells.length; i++) {
            var currXCell = xCells[i];
            var yCells = Object.keys(aliveCells_1[currXCell]);
            for (var j = 0; j < yCells.length; j++) {
                var currYCell = yCells[j];
                var x = parseInt(currXCell) - 1;
                var y = parseInt(currYCell) - 1;
                ctx_1.fillRect(x * squareWidth_1, y * squareWidth_1, squareWidth_1, squareWidth_1);
            }
        }
    };
    // Update the life of cells after a cycle
    var updateCells_1 = function () {
        // Create copy of currently alive cells
        newAliveCells_1 = createNewAlive_1(aliveCells_1);
        // Check every cell
        for (var i = 1; i <= numHorCells_1; i++) {
            for (var j = 1; j <= numVertCells_1; j++) {
                // Check if current cell is alive
                var alive = false;
                var x = i.toString();
                var y = j.toString();
                if (x in aliveCells_1) {
                    if (y in aliveCells_1[x]) {
                        alive = true;
                    }
                }
                // Check number of alive neighbors
                var aliveNeighbors = 0;
                // Iterate through neighbor positions, ignoring the cell being checked
                for (var k = -1; k < 2; k++) {
                    for (var l = -1; l < 2; l++) {
                        if (k != 0 || l != 0) {
                            var neighborX = (i + k).toString();
                            var neighborY = (j + l).toString();
                            // Check if current neighbor is alive
                            if (neighborX in aliveCells_1) {
                                if (neighborY in aliveCells_1[neighborX]) {
                                    aliveNeighbors++;
                                }
                            }
                        }
                    }
                }
                // Any live cell with fewer than two live neighbors dies, as if by underpopulation. 
                // Any live cell with more than three live neighbors dies, as if by overpopulation.
                if (alive && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
                    delete newAliveCells_1[x][y];
                }
                // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
                else if (!alive && aliveNeighbors === 3) {
                    if (x in newAliveCells_1) {
                        newAliveCells_1[x][y] = true;
                    }
                    else {
                        newAliveCells_1[x] = {};
                        newAliveCells_1[x][y] = true;
                    }
                }
            }
        }
        aliveCells_1 = newAliveCells_1;
        drawCells_1();
        drawLines_1();
    };
    // Set a cell to alive when the canvas is clicked
    var canvasClick_1 = function (e) {
        var rect = canvas_1.getBoundingClientRect();
        var x = Math.ceil((e.clientX - rect.left) / squareWidth_1).toString();
        var y = Math.ceil((e.clientY - rect.top) / squareWidth_1).toString();
        // Add clicked cell to alive cells
        if (x in aliveCells_1) {
            aliveCells_1[x][y] = true;
        }
        else {
            aliveCells_1[x] = {};
            aliveCells_1[x][y] = true;
        }
        // Redraw cells and lines
        drawCells_1();
        drawLines_1();
    };
    var init = function () {
        drawCells_1();
        drawLines_1();
        canvas_1.onclick = canvasClick_1;
        var updateButton = document.createElement('button');
        updateButton.innerText = 'Update Cells';
        updateButton.style.width = '200px';
        updateButton.style.height = '75px';
        updateButton.style.cssFloat = 'left';
        updateButton.style.fontSize = "1.5em";
        updateButton.style.backgroundColor = 'black';
        updateButton.style.color = 'white';
        updateButton.style.margin = "20px 20px 20px calc(50% - " + canvasWidth_1 / 2 + "px)";
        updateButton.onclick = updateCells_1;
        document.body.append(updateButton);
        var clearButton = document.createElement('button');
        clearButton.innerText = 'Clear Cells';
        clearButton.style.width = '200px';
        clearButton.style.height = '75px';
        clearButton.style.cssFloat = 'left';
        clearButton.style.fontSize = "1.5em";
        clearButton.style.backgroundColor = 'black';
        clearButton.style.color = 'white';
        clearButton.style.margin = '20px';
        clearButton.onclick = function () {
            aliveCells_1 = {};
            drawCells_1();
            drawLines_1();
        };
        document.body.append(clearButton);
        var christmasButton = document.createElement('button');
        christmasButton.innerText = 'Christmas Cells';
        christmasButton.style.width = '200px';
        christmasButton.style.height = '75px';
        christmasButton.style.cssFloat = 'left';
        christmasButton.style.fontSize = "1.5em";
        christmasButton.style.backgroundColor = 'black';
        christmasButton.style.color = 'white';
        christmasButton.style.margin = '20px';
        christmasButton.onclick = function () {
            aliveCells_1 = createNewAlive_1(christmasSetup_1);
            drawCells_1();
            drawLines_1();
        };
        document.body.append(christmasButton);
    };
    init();
}
