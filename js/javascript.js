//initializing collectedTreasures by 0
let collectedTreasures = 0;
// Function to generate a random number within a range
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//function of creating the dungeon grid
function createDungeonGrid(width, height) {
  const grid = [];
  const cellTypes = ['player', 'monster', 'treasure', 'empty', 'wall'];
  
  function getRandomNonPlayerCellType() {
    const randomIndex = getRandomNumber(2, cellTypes.length - 1);
    return cellTypes[randomIndex];
  }
  // Populating the grid with  cell types
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      row.push('empty');
    }
    grid.push(row);
  }
  function getRandomNonPlayerCellType() {
    const randomIndex = getRandomNumber(3, cellTypes.length - 1);
    return cellTypes[randomIndex];
  }
  //fixing a position for the player
  const playerPositions = [
    { x: 5, y: 4 },
  ]
  for (const position of playerPositions) {
    grid[position.y][position.x] = 'player';}
// fixing 5 positions for the treasure
const treasurePositions = [
  { x: 5, y: 5 },
  { x: 6, y: 6 },
 { x: 14, y: 9 },
 { x: 12, y: 5 },
 { x:17, y: 8},
];
for (const position of treasurePositions) {
  grid[position.y][position.x] = 'treasure';
}
//fixing 2 positions for the Monster
  const monsterPositions = [
    { x: 2, y: 9},
    { x: 10, y: 6 },
  ];
  for (const position of monsterPositions) {
    grid[position.y][position.x] = 'monster';
  }
 
 function getRandomNonPlayerCellType() {
  const randomIndex = getRandomNumber(5, cellTypes.length - 1);
  return cellTypes[randomIndex];
}

// creating the wall in the S shape inside the grid
for (let x = 0; x < width; x++) {
  grid[0][x] = 'wall';                     
  grid[height - 1][x] = 'wall';           
}
for (let y = 0; y < height; y++) {
  grid[y][0] = 'wall';                  
  grid[y][width - 1] = 'wall';         
}
for (let x = 1; x < width; x++) {
  grid[1][x] = 'wall';                     
  grid[height - 1][x] = 'wall';         
}
for (let y = 1; y < height; y++) {
  grid[y][1] = 'wall';                   
  grid[y][width - 2] = 'wall';         
}
for (let x = 3; x < width-4; x++) {
  grid[3][x] = 'wall';                     
  grid[height - 4][x] = 'wall';          
}
for (let y = 3; y < height-7; y++) {
  grid[y][3] = 'wall';                   
}
for (let x = 3; x < width-3; x++) {
  grid[3][x] = 'wall';                    
  grid[height - 8][x] = 'wall';         
}
for (let y = 8; y < 12; y++) {
  grid[y][width -4] = 'wall';         
}
  return grid;
}

// Function to render the dungeon grid on the webpage
function renderDungeonGrid(grid) {
  const gridContainer = document.getElementById('gridContainer');
  let html = '';
  // fct for to Loop through the grid and create HTML for each cell
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const cellType = grid[y][x];
      const cellClass = `cell cell-${cellType}`;
      html += `<div class="${cellClass}">${cellType.charAt(0).toUpperCase()}</div>`;
    }
    html += '<br>';
  }
  gridContainer.innerHTML = html;
}

// Attach event listener for key press
document.addEventListener('keydown', handleKeyPress);
// Example u of usage with a width of 25 cells and a height of 15 cells
const dungeonWidth = 25;
const dungeonHeight = 15;
let dungeonGrid = createDungeonGrid(dungeonWidth, dungeonHeight);
// Render the dungeon grid on the webpage
renderDungeonGrid(dungeonGrid);
// Move the player up
movePlayer(dungeonGrid, 'up');
// Re-render the grid after the player has moved
renderDungeonGrid(dungeonGrid);
// Function to handle user input for moving the player
function handleKeyPress(event) {
  const keyPressed = event.key;
  const validKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

  if (validKeys.includes(keyPressed)) {
    const direction = keyPressed.substr(5).toLowerCase();
    if (movePlayer(dungeonGrid, direction)) {
      moveMonsters(dungeonGrid); // Move monsters after player's move
      renderDungeonGrid(dungeonGrid);
    }
  }
}
function movePlayer(grid, direction) {
  const playerCoordinates = findPlayer(grid);
  // Determine new coordinates based on the direction
  let newX = playerCoordinates.x;
  let newY = playerCoordinates.y;
  if (direction === 'up') {
    newY -= 1;
  } else if (direction === 'down') {
    newY += 1;
  } else if (direction === 'left') {
    newX -= 1;
  } else if (direction === 'right') {
    newX += 1;
  }
  // Check if the new position is valid (within the grid and not a wall)
  if ((newX >= 0 && newX < grid[0].length && newY >= 0 && newY < grid.length && grid[newY][newX] !== 'wall' ) && (newX >= 0 && newX < grid[0].length && newY >= 0 && newY < grid.length && grid[newY][newX] !== 'monster')) {
    // Move the player to the new position
    grid[playerCoordinates.y][playerCoordinates.x] = 'empty';
    grid[newY][newX] = 'player';
    return true; // Move successful
  } else {
    return false; // Move not allowed
  }
}
// ... (Previous code remains the same)
// Function to handle user input for moving the player
function handleKeyPress(event) {
  const keyPressed = event.key;
  const validKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  if (validKeys.includes(keyPressed)) {
    const direction = keyPressed.substr(5).toLowerCase();
    if (movePlayer(dungeonGrid, direction)) {
      renderDungeonGrid(dungeonGrid);
    }
  }
}

// Function to find the coordinates of the player in the grid
function findPlayer(grid) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 'player') {
        return { x: x, y: y };
      } 
    }
  }
}
// Function to find the coordinates of all monsters in the grid
function findMonsters(grid) {
  const monsterCoordinates = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 'monster') {
        monsterCoordinates.push({ x: x, y: y });
      }
    }
  }
  return monsterCoordinates;
}

// Function to check the collision of the monster  with the player
function checkMonsterCollision(grid) {
  const playerCoordinates = findPlayer(grid);
  const monsterCoordinates = findMonsters(grid);
  for (const coordinates of monsterCoordinates) {
    if (playerCoordinates.x ===coordinates.x && playerCoordinates.y == coordinates.y) {
      return true; // Collision detected
    }
  }
  return false; // No collision
}
// Function to handle user input for moving the player
function handleKeyPress(event) {
  const keyPressed = event.key;
  const validKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  if (validKeys.includes(keyPressed)) {
    const direction = keyPressed.substr(5).toLowerCase();
    if (movePlayer(dungeonGrid, direction)) {
      // Check if the player took a treasure
      const playerCoordinates = findPlayer(dungeonGrid);
      if (dungeonGrid[playerCoordinates.y][playerCoordinates.x] === 'treasure') {
        dungeonGrid[playerCoordinates.y][playerCoordinates.x] = 'empty';
        collectedTreasures++;
       updateTreasureCounter();
      }
      // Move monsters after player's move
      moveMonsters(dungeonGrid);

      // Render the  grid
      renderDungeonGrid(dungeonGrid);

  }
  }
}
// Function to update the treasure counter  on the webpage
function updateTreasureCounter() {
  const treasureCounter = document.getElementById('treasureCounter');
  treasureCounter.textContent = collectedTreasures.toString();
}
// Function to move the player 
function movePlayer(grid, direction) {
  const playerCoordinates = findPlayer(grid);
  const monsterCoordinates = findMonsters(grid);
  
  let newX = playerCoordinates.x;
  let newY = playerCoordinates.y;
  if (direction === 'up') {
    newY -= 1;
  } else if (direction === 'down') {
    newY += 1;
  } else if (direction === 'left') {
    newX -= 1;
  } else if (direction === 'right') {
    newX += 1;
  }
// Check if the new position is validin the grid and its  not a wall)
  if (
    newX >= 0 && newX < grid[0].length &&
    newY >= 0 && newY < grid.length &&
    grid[newY][newX] !== 'wall'
  ) {
    // Check if the new position contains a treasure
    if (grid[newY][newX] === 'treasure') {
      // Increment the collectedTreasures counter and remove the treasure from the cell
      grid[newY][newX] = 'empty';
      collectedTreasures++;  
      updateTreasureCounter();
    }
    // Check for collision with monsters
    for (const monster of monsterCoordinates) {
      if (monster.x === newX && monster.y === newY) {
        // Collision with a monster, show game over message and stop the game
        alert("You Lost! , Restart the game and take a second chance ");
        document.removeEventListener('keydown', handleKeyPress);
        return;
      }
    }
    // Move the player to the new position
    grid[playerCoordinates.y][playerCoordinates.x] = 'empty';
    grid[newY][newX] = 'player';
    moveMonsters(grid); // Move monsters after player's move
    renderDungeonGrid(grid);
    // Check for winning condition and Stop the game if the player collected all treasures and show the alert
    if (collectedTreasures === 5) {
      
      document.removeEventListener('keydown', handleKeyPress);
     alert(" Congraats You Won the Whole Prize!");
      return; 
     }
   }
}

// Function to move the monsters in the dungeon grid
function moveMonsters(grid) {
  const monsterCoordinates = findMonsters(grid);
  const playerCoordinates = findPlayer(grid);
    for (const coordinates of monsterCoordinates) {
    const directions = [ 'up','down','left','right'];
    const direction = directions[getRandomNumber(0, 3)];
    let newX = coordinates.x;
    let newY = coordinates.y;
     if (direction === 'up') {
      newY -= 1;
    } else if (direction === 'down') {
      newY += 1;
    } else if (direction === 'left') {
      newX -= 1;
    } else if (direction === 'right') {
      newX += 1;
    }
    if (newX >= 0 && newX < grid[0].length && newY >= 0 && newY < grid.length && grid[newY][newX] !== 'wall') {
      // Check if the new position is not a treasure and not the player's position
      if ( (grid[newY][newX] !== 'treasure' && grid[newY][newX] !== 'player' ) ){
       // Move the monster to the new position
        grid[coordinates.y][coordinates.x] = 'empty';
        grid[newY][newX] = 'monster';
      } else  if (  grid[newY][newX] == 'player' ){
        alert("You Lost! , Restart the game and take a second chance");
        document.removeEventListener('keydown', handleKeyPress);
        return;
      }
    } 
  }
 
}

  function renderDungeonGrid(grid) {
  const gridContainer = document.getElementById('gridContainer');
  let html = '';
// Loop through the grid and create HTML for each cell
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const cellType = grid[y][x];
      const cellClass = `cell cell-${cellType}`;

      // Add the player image if the cell contains the player
      if (cellType === 'player') {
        html += `<div class="${cellClass}"><img src="./img/path4754.png" alt="Player"></div>`;
      } else if  (cellType === 'monster') {
        html += `<div class="${cellClass}"><img src="./img/Ciclope.png" alt="Monster"></div>`;
      }
      else if (cellType === 'treasure') {
        html += `<div class="${cellClass}"><img src="./img/chest (1).png" alt="Treasure"></div>`;}
       
        else if (cellType === 'wall') {
          html += `<div class="${cellClass}"><img src="img/palmtree.png" alt="Wall"></div>`;}
           else {
        html += `<div class="${cellClass}">${cellType.charAt(0).toUpperCase()}</div>`;
      }
    }
    html += '<br>';
  }
  gridContainer.innerHTML = html;
}
// Render the dungeon grid on the webpage
renderDungeonGrid(dungeonGrid);


function restartGame() {
  // Reset the collected treasures counter
  collectedTreasures = 0;
  // Recreate the dungeon grid with initial positions and setup
  dungeonGrid = createDungeonGrid(dungeonWidth, dungeonHeight);
  // Render the updated grid
  renderDungeonGrid(dungeonGrid);
  // Re attach the event listener for key press
  document.addEventListener('keydown', handleKeyPress);
  // Reset the treasure counter element
  updateTreasureCounter();
}

//function to show the gameover
function showGameOverMessage(message) {
  const gridContainer = document.getElementById('gridContainer');
  const gameOverMessage = document.createElement('div');
  gameOverMessage.classList.add('game-over-message');
  gameOverMessage.textContent = message;
  gridContainer.appendChild(gameOverMessage);
}
