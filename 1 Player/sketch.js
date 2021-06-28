//SNAKE GAME
//BY MAX ANDERSON 2020

let Snake = new snake();

let count = 0;
let gameOver = false;
let score;
let foodX;
let foodY;
let dir1;

function setup() {
  createCanvas(405, 405);
  
    //initializing random spots for the food
    foodX = (Math.floor(Math.random() * 27))*15;
    foodY = (Math.floor(Math.random() * 27))*15;
}

function draw() {
  background(0);
  //if the variable gameOver becomes true display the text and the score
  //the if statement on line 16 is the same as saying if(gameOver === true)
  if (gameOver) {
    score = Snake.body.length;
    fill(255, 0, 0);
    rect(0, 0, width, height);
    textSize(30);
    stroke(0, 255, 0);
    fill(0, 255, 0);
    text("GAME OVER!", 110, height / 2);
    text("Score = " + score, 140, 240);
  }

  //if the gameOver variable is false run the game code 
  //Note: in the if statement on line 28 I used the NOT operator
  //but it is equal to saying if (gameOver === false)
  if (!gameOver) {
    //drawing a grid to make the program easier for me to code
    //I wanted to make everything a multiple of 15 so the food and snake would line up 
    //nicely
    //if you change the value of background on line 13 from 0 (black) to 255 (white)
    //you will be able to see this grid
    for (let i = 0; i <= width; i += 15) {
      line(0, i, width, i);
      line(i, 0, i, height);
    }

    //this code runs programs in the snake object
    Snake.snakeUpdate();
    Snake.move();
    Snake.display();
    Snake.eat();

    food();
  }
}

//this is the code for the snake
function snake() {
  this.headXY = [45, 0];

  this.body = [this.headXY];

  this.segment = function(segX, segY) {
    this.segmentXY = [0, 0];
    rect(segX, segY, 15, 15);
  }

  this.display = function() {
    let length = this.body.length - 1;
    frameRate(8);
    fill(0, 255, 0);

    //the snakes head
    rect(this.headXY[0], this.headXY[1], 15, 15);

    //displaying the snake for every segment in the body array
    for (let i = 0; i <= length; i++) {
      new this.segment(this.body[i][0], this.body[i][1]);
    }
    noFill();
  }

  this.move = function() {
    if (dir1 === 0) {
      this.headXY[1] -= 15;
    }
    if (dir1 === 1) {
      this.headXY[1] += 15;
    }
    if (dir1 === 2) {
      this.headXY[0] -= 15;
    }
    if (dir1 === 3) {
      this.headXY[0] += 15;
    }

    //checking if the snake collided with the walls or body
    endGame(this.headXY, this.body);
  }

  this.eat = function() {
    if (this.headXY[0] === foodX && this.headXY[1] === foodY) {

    //new fruit location
    //new spot for food
    foodX = (Math.floor(Math.random() * 27))*15;
    foodY = (Math.floor(Math.random() * 27))*15;

      this.grow();
    }
  }

  this.grow = function() {
    this.body.push(new this.segment().segmentXY);
  }

  this.snakeUpdate = function() { 
    for (let i = this.body.length - 1; i > 0; i--) {
      if (i > 0) {
        //updating the snakes x and y cord to the cords from the segment           //before it
        this.body[i][0] = this.body[i - 1][0];
        this.body[i][1] = this.body[i - 1][1];

      }
    }
  }
}

//this function controls wether the game ends or not
function endGame(snake1Head, snake1Body, snake2Head, snake2Body) {

  //checking if the snake hit the walls
  if (snake1Head[0] > width || snake1Head[0] < 0 || snake1Head[1] > height || snake1Head[1] < 0) {
    gameOver = true;
  }

  //testing for collision with body
  for (let i = 1; i < snake1Body.length; i++) {
    if (snake1Head[0] == snake1Body[i][0] && snake1Head[1] == snake1Body[i][1]) {
      gameOver = true;
    }
  }
}

//this simple function displays the food
//it pulls the cords from a list of randomly generated numbers
function food() {
  fill(255, 0, 0);
  rect(foodX, foodY, 15, 15);
  noFill();

}

function keyPressed () {
    if (keyCode === UP_ARROW && dir1 !== 1) {
      dir1 = 0;
    } else if (keyCode === DOWN_ARROW && dir1 !== 0) {
      dir1 = 1;
    } else if (keyCode === LEFT_ARROW && dir1 !== 3) {
      dir1 = 2;
    } else if (keyCode === RIGHT_ARROW && dir1 !== 2) {
      dir1 = 3;
    }

    //checking if the snake collided with the walls or body
    endGame(Snake.headXY, Snake.body);

}