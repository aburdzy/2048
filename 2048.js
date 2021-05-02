class Board {

  constructor() {
    this.tiles = [[], [], [], []];
    this.size = 4;
    this.movePosibility = true;
    this.score = document.querySelector('.score');
    this.gameOver = document.querySelector('.game-over');
    this.restart = document.querySelector('.restart');
  }

  addTile(tile) {
    this.tiles[tile.x][tile.y] = tile;
  }

  showBoard() {
    console.log(this.tiles);
  }

  startGame() {
    let randomPositionX1 = Math.floor(Math.random() * this.size);
    let randomPositionY2 = Math.floor(Math.random() * this.size);
    let randomPositionX3; 
    let randomPositionY4;

    do {
      randomPositionX3 = Math.floor(Math.random() * this.size);
      randomPositionY4 = Math.floor(Math.random() * this.size);
    } while(randomPositionX1 == randomPositionX3 && randomPositionY2 == randomPositionY4);
    
    this.tiles[randomPositionX1][randomPositionY2].setValue(2);
    this.tiles[randomPositionX3][randomPositionY4].setValue(2);
  }

  move(direction) { 
    let checked = false;

    if(direction == 'left') {
      for(let y = 0; y < this.size; y++) {
        for(let x = 0; x < this.size; x++) {
          if(this.tiles[x][y].value) {
            let column = y;
            while (column > 0) {
              if(!this.tiles[x][column - 1].value) {
                this.tiles[x][column - 1].setValue(this.tiles[x][column].value);
                this.tiles[x][column].setValue(0);
                
                column--;

                checked = true;
              }
              else if(this.tiles[x][column - 1].value == this.tiles[x][column].value) {
                this.tiles[x][column - 1].setValue(this.tiles[x][column - 1].value * 2);
                this.tiles[x][column].setValue(0);
                this.score.innerHTML = parseInt(this.score.innerHTML) + this.tiles[x][column - 1].value;

                checked = true;
                break;
              }
              else
                break;
            }
          }
        }
      }
      if(checked) {
        this.addNewTile();
      }
    }
    else if(direction == 'right') {
      for(let x = 0; x < this.size; x++) {
        for(let y = this.size - 2; y >= 0; y--) {
          if(this.tiles[x][y].value) {
            let column = y;
            while (column + 1 < this.size) {
              if(!this.tiles[x][column + 1].value) {
                this.tiles[x][column + 1].setValue(this.tiles[x][column].value);
                this.tiles[x][column].setValue(0);
                column++;

                checked = true;
              }
              else if(this.tiles[x][column + 1].value == this.tiles[x][column].value) {
                this.tiles[x][column + 1].setValue(this.tiles[x][column + 1].value * 2);
                this.tiles[x][column].setValue(0);
                this.score.innerHTML = parseInt(this.score.innerHTML) + this.tiles[x][column + 1].value;

                checked = true;
                break;
              }
              else 
                break;
            }
          }
        }
      }
      if(checked) {
        this.addNewTile();
      }
    }
    else if(direction == 'down') {
      for(let y = 0; y < this.size; y++) {
        for(let x = this.size - 2; x >= 0; x--) {
          if(this.tiles[x][y].value) {
            let row = x;
            while (row + 1 < this.size) {
              if(!this.tiles[row + 1][y].value) {
                this.tiles[row + 1][y].setValue(this.tiles[row][y].value);
                this.tiles[row][y].setValue(0);
                row++;

                checked = true;
              }
              else if(this.tiles[row + 1][y].value == this.tiles[row][y].value) {
                this.tiles[row + 1][y].setValue(this.tiles[row + 1][y].value * 2);
                this.tiles[row][y].setValue(0);
                this.score.innerHTML = parseInt(this.score.innerHTML) + this.tiles[row + 1][y].value;

                checked = true;
                break;
              }
              else 
                break;
            }
          }
        }
      }
      if(checked) {
        this.addNewTile();
      }
    }
    else if(direction == 'up') {
      for(let y = 0; y < this.size; y++) {
        for(let x = 0; x < this.size; x++) {
          if(this.tiles[x][y].value) {
            let row = x;
            while (row > 0) {
              if(!this.tiles[row - 1][y].value) {
                this.tiles[row - 1][y].setValue(this.tiles[row][y].value);
                this.tiles[row][y].setValue(0);
                row--;

                checked = true;
              }
              else if(this.tiles[row - 1][y].value == this.tiles[row][y].value) {
                this.tiles[row - 1][y].setValue(this.tiles[row - 1][y].value * 2);
                this.tiles[row][y].setValue(0);
                this.score.innerHTML = parseInt(this.score.innerHTML) + this.tiles[row - 1][y].value;
                
                checked = true;
                break;
              }
              else 
                break;
            }
          }
        }
      }
      if(checked) {
        this.addNewTile();
      }
    }
  }

  checkWin() {
    for(let y = 0; y < this.size; y++) {
      for(let x = 0; x < this.size; x++) {
        if(this.tiles[x][y].value == 2048) {
          this.movePosibility = false;

          this.gameOver.classList.remove('disable');
          this.gameOver.classList.add('able');

          document.querySelector('.text').innerHTML = 'You WIN!';
          document.querySelector('.final-score').innerHTML += this.score.innerHTML;

          this.restart.addEventListener('click', () => this.restartGame());
        }
      }
    }
  }

  addNewTile() {
    let positionX;
    let positionY;
    let possibilities = [2,4];
    let counterFillFields = 0;

    for(let y = 0; y < this.size; y++) {
      for(let x = 0; x < this.size; x++) {
        if(this.tiles[x][y].value != 0) {
          counterFillFields++;
        }
      }
    }
    
    if(counterFillFields < this.size * this.size) {
      do {
        positionX = Math.floor(Math.random() * this.size);
        positionY = Math.floor(Math.random() * this.size);
      } while(this.tiles[positionX][positionY].value != 0);
      
      this.tiles[positionX][positionY].setValue(possibilities[Math.floor(Math.random() * 2)]);
      counterFillFields++;

        if (counterFillFields == this.size * this.size) {
          this.movePosibility = false;

          this.gameOver.classList.remove('disable');

          document.querySelector('.text').innerHTML = 'You lost!';
          document.querySelector('.final-score').innerHTML += this.score.innerHTML;

          this.score.classList.add('disable');

          this.restart.addEventListener('click', () => this.restartGame());
        }
    }
    counterFillFields = 0;
  }

  restartGame() {
    for(let x = 0; x < board.size; x++) {
      for(let y = 0; y < board.size; y++) {
        this.tiles[x][y].setValue(0);
      }
    }
    this.startGame();

    this.gameOver.classList.add('disable');
    this.score.classList.remove('disable');
    this.score.innerHTML = 0;
    document.querySelector('.final-score').innerHTML = '';

    this.movePosibility = true;
  }
}

class Tile {

  constructor(x, y, value, element) {
    this.x = x;
    this.y = y
    this.value = value;
    this.element = element;
  }

  setValue(value) {
    let tilesColor = ['#faf8ef', '#cfdb27', '#45c9f5', '#bc4ddb', '#ed77eb', '#dba94d', '#81db4d', '#c957c4', '#6363cf','#9e3c3c', '#297994', '#54e334'];
    this.value = value;
    this.element.innerHTML = (value == 0) ? '' : value;
    this.element.style.backgroundColor = tilesColor[(value == 0) ? 0 : Math.log2(value)];
  }
}


let board = new Board();

let tileElements = document.querySelectorAll('.tile');

for(let x = 0; x < board.size; x++) {
  for(let y = 0; y < board.size; y++) {
    board.addTile(new Tile(x, y, 0, tileElements[x * board.size + y]));
  }
}

board.startGame();

window.addEventListener('keydown', (ev) => {
  switch (ev.key) {
    case 'ArrowLeft':
      if(board.movePosibility)  
        board.move('left');
        board.checkWin();
      break;
    case 'ArrowUp':
      if(board.movePosibility)   
        board.move('up');
        board.checkWin();
      break;
    case 'ArrowRight':
      if(board.movePosibility)   
        board.move('right');
        board.checkWin();
      break;
    case 'ArrowDown':
      if(board.movePosibility)  
        board.move('down');
        board.checkWin();
      break;
     }
});

  





