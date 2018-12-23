{
    // Canvas Dimensions
    const canvasWidth = 1000;
    const canvasHeight = 500;
    const squareWidth = 25;
    const lineWidth = 2;
    const numHorCells = canvasWidth / squareWidth;
    const numVertCells = canvasHeight / squareWidth;
    const lineColor = 'black';
    const deadColor = 'green';
    const aliveColor = 'red';
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.clear = 'both';
    canvas.style.margin = '20px';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    /*
      Rules
      ==========================
      Any live cell with fewer than two live neighbors dies, as if by underpopulation.
      Any live cell with two or three live neighbors lives on to the next generation.
      Any live cell with more than three live neighbors dies, as if by overpopulation.
      Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
    */
    let aliveCells = {};
    let newAliveCells = {};
    // Create an empty object and copy the aliveCells values to it
    const createNewAlive = (currentAlive) => {
        let newAlive = {};
        for (let x in currentAlive) {
            for (let y in currentAlive[x]) {
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
    // Draw lines on the board
    const drawLines = () => {
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        let lineX = 0;
        for (let i = lineX; i <= canvasWidth; i += squareWidth) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvasHeight);
            ctx.stroke();
        }
        let lineY = 0;
        for (let i = lineY; i <= canvasWidth; i += squareWidth) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvasWidth, i);
            ctx.stroke();
        }
    };
    // Iterate through alive cells and draw them
    const drawCells = () => {
        ctx.fillStyle = deadColor;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = aliveColor;
        let xCells = Object.keys(aliveCells);
        for (let i = 0; i < xCells.length; i++) {
            let currXCell = xCells[i];
            let yCells = Object.keys(aliveCells[currXCell]);
            for (let j = 0; j < yCells.length; j++) {
                let currYCell = yCells[j];
                let x = parseInt(currXCell) - 1;
                let y = parseInt(currYCell) - 1;
                ctx.fillRect(x * squareWidth, y * squareWidth, squareWidth, squareWidth);
            }
        }
    };
    // Update the life of cells after a cycle
    const updateCells = () => {
        // Create copy of currently alive cells
        newAliveCells = createNewAlive(aliveCells);
        // Check every cell
        for (let i = 1; i <= numHorCells; i++) {
            for (let j = 1; j <= numVertCells; j++) {
                // Check if current cell is alive
                let alive = false;
                let x = i.toString();
                let y = j.toString();
                if (x in aliveCells) {
                    if (y in aliveCells[x]) {
                        alive = true;
                    }
                }
                // Check number of alive neighbors
                let aliveNeighbors = 0;
                // Iterate through neighbor positions, ignoring the cell being checked
                for (let k = -1; k < 2; k++) {
                    for (let l = -1; l < 2; l++) {
                        if (k != 0 || l != 0) {
                            let neighborX = (i + k).toString();
                            let neighborY = (j + l).toString();
                            // Check if current neighbor is alive
                            if (neighborX in aliveCells) {
                                if (neighborY in aliveCells[neighborX]) {
                                    aliveNeighbors++;
                                }
                            }
                        }
                    }
                }
                // Any live cell with fewer than two live neighbors dies, as if by underpopulation. 
                // Any live cell with more than three live neighbors dies, as if by overpopulation.
                if (alive && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
                    delete newAliveCells[x][y];
                }
                // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
                else if (!alive && aliveNeighbors === 3) {
                    if (x in newAliveCells) {
                        newAliveCells[x][y] = true;
                    }
                    else {
                        newAliveCells[x] = {};
                        newAliveCells[x][y] = true;
                    }
                }
            }
        }
        aliveCells = newAliveCells;
        drawCells();
        drawLines();
    };
    // Set a cell to alive when the canvas is clicked
    const canvasClick = (e) => {
        let rect = canvas.getBoundingClientRect();
        let x = Math.ceil((e.clientX - rect.left) / squareWidth).toString();
        let y = Math.ceil((e.clientY - rect.top) / squareWidth).toString();
        // Add clicked cell to alive cells
        if (x in aliveCells) {
            aliveCells[x][y] = true;
        }
        else {
            aliveCells[x] = {};
            aliveCells[x][y] = true;
        }
        // Redraw cells and lines
        drawCells();
        drawLines();
    };
    const init = () => {
        drawCells();
        drawLines();
        canvas.onclick = canvasClick;
        let br = document.createElement('br');
        document.body.append(br);
        let button = document.createElement('button');
        button.innerText = 'Update Cells';
        button.style.width = '200px';
        button.style.height = '100px';
        button.style.cssFloat = 'left';
        button.onclick = updateCells;
        button.style.backgroundColor = 'green';
        document.body.append(button);
    };
    init();
}
