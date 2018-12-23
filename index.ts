{
  // Canvas Dimensions
  const canvasWidth: number = 1000;
  const canvasHeight: number = 500;
  const squareWidth: number = 25;
  const lineWidth: number = 2;

  const numHorCells: number = canvasWidth / squareWidth;
  const numVertCells: number = canvasHeight / squareWidth;

  let lineColor: string = 'black';
  let deadColor: string = 'blue';
  let aliveColor: string = 'yellow';

  const h1 = document.createElement('h1');
  h1.style.textAlign = 'center';
  h1.style.margin = '20px 0';
  h1.innerHTML = 'Conway\'s Game of Life - <a href="https://github.com/JimDaGuy/cgol-ts">JimDaGuy</a>';
  document.body.append(h1);

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.style.clear = 'both';
  canvas.style.margin = `20px calc(50% - ${canvasWidth / 2}px)`;
  document.body.append(canvas);
  const ctx = canvas.getContext('2d');

  /*
    Rules
    ==========================
    Any live cell with fewer than two live neighbors dies, as if by underpopulation.
    Any live cell with two or three live neighbors lives on to the next generation.
    Any live cell with more than three live neighbors dies, as if by overpopulation.
    Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
  */

  // Create an empty object and copy the aliveCells values to it
  const createNewAlive = (currentAlive) => {
    let newAlive = {};
    for (let x in currentAlive) {
      for (let y in currentAlive[x]) {
        if (x in newAlive) {
          newAlive[x][y] = true;
        } else {
          newAlive[x] = {};
          newAlive[x][y] = true;
        }
      }
    }
    return newAlive;
  };

  // Custom setup
  let christmasSetup = {};
  christmasSetup['17'] = {};
  christmasSetup['17']['12'] = true;
  christmasSetup['17']['13'] = true;
  christmasSetup['18'] = {};
  christmasSetup['18']['10'] = true;
  christmasSetup['18']['11'] = true;
  christmasSetup['18']['12'] = true;
  christmasSetup['18']['13'] = true;
  christmasSetup['19'] = {};
  christmasSetup['19']['8'] = true;
  christmasSetup['19']['9'] = true;
  christmasSetup['19']['10'] = true;
  christmasSetup['19']['11'] = true;
  christmasSetup['19']['12'] = true;
  christmasSetup['19']['13'] = true;
  christmasSetup['20'] = {};
  christmasSetup['20']['7'] = true;
  christmasSetup['20']['8'] = true;
  christmasSetup['20']['9'] = true;
  christmasSetup['20']['10'] = true;
  christmasSetup['20']['11'] = true;
  christmasSetup['20']['12'] = true;
  christmasSetup['20']['13'] = true;
  christmasSetup['21'] = {};
  christmasSetup['21']['6'] = true;
  christmasSetup['21']['7'] = true;
  christmasSetup['21']['8'] = true;
  christmasSetup['21']['9'] = true;
  christmasSetup['21']['10'] = true;
  christmasSetup['21']['11'] = true;
  christmasSetup['21']['12'] = true;
  christmasSetup['21']['13'] = true;
  christmasSetup['21']['14'] = true;
  christmasSetup['21']['15'] = true;
  christmasSetup['22'] = {};
  christmasSetup['22']['7'] = true;
  christmasSetup['22']['8'] = true;
  christmasSetup['22']['9'] = true;
  christmasSetup['22']['10'] = true;
  christmasSetup['22']['11'] = true;
  christmasSetup['22']['12'] = true;
  christmasSetup['22']['13'] = true;
  christmasSetup['23'] = {};
  christmasSetup['23']['8'] = true;
  christmasSetup['23']['9'] = true;
  christmasSetup['23']['10'] = true;
  christmasSetup['23']['11'] = true;
  christmasSetup['23']['12'] = true;
  christmasSetup['23']['13'] = true;
  christmasSetup['24'] = {};
  christmasSetup['24']['10'] = true;
  christmasSetup['24']['11'] = true;
  christmasSetup['24']['12'] = true;
  christmasSetup['24']['13'] = true;
  christmasSetup['25'] = {};
  christmasSetup['25']['12'] = true;
  christmasSetup['25']['13'] = true;

  let aliveCells = {};
  let newAliveCells = {};

  // Draw lines on the board
  const drawLines = () => {
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;

    let lineX: number = 0;
    for (let i = lineX; i <= canvasWidth; i += squareWidth) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvasHeight);
      ctx.stroke();
    }

    let lineY: number = 0;
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
        let alive: boolean = false;
        let x: string = i.toString();
        let y: string = j.toString();
        if (x in aliveCells) {
          if (y in aliveCells[x]) {
            alive = true;
          }
        }

        // Check number of alive neighbors
        let aliveNeighbors: number = 0;
        // Iterate through neighbor positions, ignoring the cell being checked
        for (let k = -1; k < 2; k++) {
          for (let l = -1; l < 2; l++) {
            if (k != 0 || l != 0) {
              let neighborX: string = (i + k).toString();
              let neighborY: string = (j + l).toString();
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
          } else {
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
    let x: string = Math.ceil((e.clientX - rect.left) / squareWidth).toString();
    let y: string = Math.ceil((e.clientY - rect.top) / squareWidth).toString();

    // Add clicked cell to alive cells
    if (x in aliveCells) {
      aliveCells[x][y] = true;
    } else {
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

    let updateButton = document.createElement('button');
    updateButton.innerText = 'Update Cells';
    updateButton.style.width = '200px';
    updateButton.style.height = '75px';
    updateButton.style.cssFloat = 'left';
    updateButton.style.fontSize = "1.5em";
    updateButton.style.backgroundColor = 'black';
    updateButton.style.color = 'white';
    updateButton.style.margin = `20px 20px 20px calc(50% - ${canvasWidth / 2}px)`;
    updateButton.onclick = updateCells;
    document.body.append(updateButton);

    let clearButton = document.createElement('button');
    clearButton.innerText = 'Clear Cells';
    clearButton.style.width = '200px';
    clearButton.style.height = '75px';
    clearButton.style.cssFloat = 'left';
    clearButton.style.fontSize = "1.5em";
    clearButton.style.backgroundColor = 'black';
    clearButton.style.color = 'white';
    clearButton.style.margin = '20px';
    clearButton.onclick = () => {
      aliveCells = {};
      deadColor = 'blue';
      aliveColor = 'yellow';
      drawCells();
      drawLines();
    };
    document.body.append(clearButton);

    let christmasButton = document.createElement('button');
    christmasButton.innerText = 'Christmas Mode';
    christmasButton.style.width = '200px';
    christmasButton.style.height = '75px';
    christmasButton.style.cssFloat = 'left';
    christmasButton.style.fontSize = "1.5em";
    christmasButton.style.backgroundColor = 'black';
    christmasButton.style.color = 'white';
    christmasButton.style.margin = '20px';
    christmasButton.onclick = () => {
      aliveCells = createNewAlive(christmasSetup);
      deadColor = 'red';
      aliveColor = 'green';
      drawCells();
      drawLines();
    };
    document.body.append(christmasButton);
  };

  init();
}
