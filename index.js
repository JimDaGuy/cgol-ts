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
    class Cell {
        constructor(x, y, xVel, yVel) {
            this.x = x;
            this.y = y;
            this.xVel = xVel;
            this.yVel = yVel;
        }
        progress() {
            this.x = this.x + this.xVel;
            this.y = this.y + this.yVel;
        }
        dirStar() {
            console.dir(`${this.x},${this.y} : ${this.xVel},${this.yVel}`);
        }
    }
    let aliveCells = {};
    let newAliveCells = {};
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
    const drawCells = () => {
        ctx.fillStyle = deadColor;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = aliveColor;
        let xCells = Object.keys(aliveCells);
        console.dir(aliveCells);
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
    const updateCells = () => {
        // Update Cells
        newAliveCells = Object.assign({}, aliveCells);
        for (let i = 1; i <= numHorCells; i++) {
            for (let j = 1; j <= numVertCells; j++) {
                // Check number of alive neighbors
                let aliveNeighbors = 0;
                let alive = false;
                // Check if current cell is alive
                if (i in aliveCells) {
                    if (j in aliveCells[i]) {
                        alive = true;
                    }
                }
                // Iterate through neighbor positions, ignoring the cell being checked
                for (let k = -1; k < 2; k++) {
                    for (let l = -1; l < 2; l++) {
                        if (k != 0 || l != 0) {
                            if (i === 4 && j === 4) {
                                console.dir(i + k);
                                console.dir(aliveCells[i + k]);
                            }
                            if (i + k in aliveCells) {
                                if (j + l in aliveCells[i + k]) {
                                    aliveNeighbors++;
                                }
                            }
                        }
                    }
                }
                // Any live cell with fewer than two live neighbors dies, as if by underpopulation. 
                // Any live cell with more than three live neighbors dies, as if by overpopulation.
                if (alive && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
                    delete newAliveCells[i][j];
                }
                // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
                else if (!alive && aliveNeighbors === 3) {
                    console.dir(`Dead cell with three alive neighbors at ${i},${j}`);
                    if (i in newAliveCells) {
                        newAliveCells[i][j] = true;
                    }
                    else {
                        newAliveCells[i] = {};
                        newAliveCells[i][j] = true;
                    }
                }
            }
        }
        aliveCells = newAliveCells;
        drawCells();
        drawLines();
    };
    const canvasClick = (e) => {
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        x = Math.ceil(x / squareWidth);
        y = Math.ceil(y / squareWidth);
        console.dir(`${x}:${y}`);
        // Add clicked cell to alive cells
        if (x in aliveCells) {
            aliveCells[x][y] = true;
            console.dir(`Adding to existing x ${x},${y}`);
        }
        else {
            aliveCells[x] = {};
            aliveCells[x][y] = true;
            console.dir(`New x ${x},${y}`);
        }
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
