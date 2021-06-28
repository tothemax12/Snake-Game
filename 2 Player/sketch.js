//SNAKE GAME (2-Players)
//BY MAX ANDERSON 2020

let Snake = new snake();
let Snake2 = new snake2();
let foodX;
let foodY;
let food2X;
let food2Y;
let count = 0;
let count2 = 0;
let gameOver = false;
let score;
let dir1;
let dir2;

let head1 = [120, 120];
let head2 = [240, 120];

let body = [head1];
let body2 = [head2];

function setup() {
    createCanvas(405, 405);

    //initializing random spots for the food
    foodX = (Math.floor(Math.random() * 27))*15;
    foodY = (Math.floor(Math.random() * 27))*15;

    
    //generating random spots for the 2nd food
    food2X = (Math.floor(Math.random() * 27))*15;
    food2Y = (Math.floor(Math.random() * 27))*15;
}

function draw() {
  background(0);
  frameRate(6);
  //if the variable gameOver becomes true display the text and the score
  //the if statement on line 16 is the same as saying if(gameOver === true)
  if (gameOver) {
    score1 = Snake.body.length;
    score2 = Snake2.body.length;
    fill(255, 0, 0);
    rect(0, 0, width, height);
    textSize(30);
    stroke(0, 255, 0);
    fill(0, 255, 0);
    text("GAME OVER!", 110, height / 2);
    text("P1 Score = " + score1, 130, 240);
    text("P2 Score = " + score2, 130, 265);
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

    Snake2.snakeUpdate();
    Snake2.move();
    Snake2.display();
    Snake2.eat();
    
    food();
    food2();
  }
}

//this is the code for the snake
function snake() {
  this.headXY = [120, 120];
  //this.bodyXY = [30, 0];
  //this.body2XY = [15, 0];

  this.body = [this.headXY];

  this.segment = function(segX, segY) {
    this.segmentXY = [0, 0];
    rect(segX, segY, 15, 15);
  }

  this.display = function() {
    let length = this.body.length - 1;
    fill(0, 255, 0);

    //the snakes head
    rect(this.headXY[0], this.headXY[1], 15, 15);

    //displaying the snake for every segment in the body array
    for (let i = 0; i <= length; i++) {
      new this.segment(this.body[i][0], this.body[i][1]);
    }
    //rect(this.bodyXY[0], this.bodyXY[1], 15, 15);
    //rect(this.body2XY[0], this.body2XY[1], 15, 15);
    noFill();
  }

  this.move = function() {
    if (dir1 === 0) {
      //making sure they don't go backwards
      //if(this.body[1] === undefined || (this.head[0] !== this.body[1][0] && this.head[1] !== this.body[1][1])) {
      this.headXY[1] -= 15;
    //}
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
    head1 = this.headXY;
    //checking if the snake collided with the walls or body
    endGame(this.headXY, this.body);

    /*
    //test code for collision
    for (let i = 1; i < this.body.length; i++) {
      if (this.headXY[0] == this.body[i][0] && this.headXY[1] == this.body[i][1]) {
            fill(0, 255, 0);
            rect(0, 0, width, height);
      }
    }
    */
  }

  this.eat = function() {
    //fruit 1 detection
    if (this.headXY[0] === foodX && this.headXY[1] === foodY) {

    //new fruit location
    //generating random spots for the food
    foodX = (Math.floor(Math.random() * 27))*15;
    foodY = (Math.floor(Math.random() * 27))*15;
      
       this.grow();
    }
    
      //detection and location for fruit 2
  if (this.headXY[0] === food2X && this.headXY[1] === food2Y) { 
    
    //generating random spots for the 2nd food
    food2X = (Math.floor(Math.random() * 27))*15;
    food2Y = (Math.floor(Math.random() * 27))*15;
      
      this.grow();
    }
    
  }

  this.grow = function() {
    this.body.push(new this.segment().segmentXY);
    body.push(new this.segment().segmentXY);
  }

  this.snakeUpdate = function() {
    for (let i = this.body.length - 1; i > 0; i--) {
      if (i > 0) {
        //updating the snakes x and y cord to the cords from the segment           //before it
        this.body[i][0] = this.body[i - 1][0];
        this.body[i][1] = this.body[i - 1][1];
        
        //updating global snake
        body[i][0] = this.body[i - 1][0];
        body[i][1] = this.body[i - 1][1];
      }
    }
  }
}

//this is the code for the snake
function snake2() {
  this.headXY = [240, 120];
  //this.bodyXY = [30, 0];
  //this.body2XY = [15, 0];

  this.body = [this.headXY];

  this.segment = function(segX, segY) {
    this.segmentXY = [0, 0];
    rect(segX, segY, 15, 15);
  }

  this.display = function() {
    let length = this.body.length - 1;
    fill(70, 102, 255);

    //the snakes head
    rect(this.headXY[0], this.headXY[1], 15, 15);

    //displaying the snake for every segment in the body array
    for (let i = 0; i <= length; i++) {
      new this.segment(this.body[i][0], this.body[i][1]);
    }
    //rect(this.bodyXY[0], this.bodyXY[1], 15, 15);
    //rect(this.body2XY[0], this.body2XY[1], 15, 15);
    noFill();
  }

  this.move = function() {
    if (dir2 === 0) {
      this.headXY[1] -= 15;
    }
    if (dir2 === 1) {
      this.headXY[1] += 15;
    }
    if (dir2 === 2) {
      this.headXY[0] -= 15;
    }
    if (dir2 === 3) {
      this.headXY[0] += 15;
    }
    head2 = this.headXY;
    //checking if the snake collided with the walls or body
    endGame(this.headXY, this.body);

    /*
    //test code for collision
    for (let i = 1; i < this.body.length; i++) {
      if (this.headXY[0] == this.body[i][0] && this.headXY[1] == this.body[i][1]) {
            fill(0, 255, 0);
            rect(0, 0, width, height);
      }
    }
    */
  }

this.eat = function() {
    //fruit 1 detection
    if (this.headXY[0] === foodX && this.headXY[1] === foodY) {

    //new fruit location
    //generating random spots for the food
    foodX = (Math.floor(Math.random() * 27))*15;
    foodY = (Math.floor(Math.random() * 27))*15;
      
       this.grow();
    }
    
      //detection and location for fruit 2
  if (this.headXY[0] === food2X && this.headXY[1] === food2Y) { 
    
    //generating random spots for the 2nd food
    food2X = (Math.floor(Math.random() * 27))*15;
    food2Y = (Math.floor(Math.random() * 27))*15;
      
      this.grow();
    }
    
  }

  this.grow = function() {
    this.body.push(new this.segment().segmentXY);
    body2.push(new this.segment().segmentXY);
  }

  this.snakeUpdate = function() {
    for (let i = this.body.length - 1; i > 0; i--) {
      if (i > 0) {
        //updating the snakes x and y cord to the cords from the segment           //before it
        this.body[i][0] = this.body[i - 1][0];
        this.body[i][1] = this.body[i - 1][1];
        
        //updating global snake
        body2[i][0] = this.body[i - 1][0];
        body2[i][1] = this.body[i - 1][1];
      }
    }
  }
}


//this function controls wether the game ends or not
function endGame(snake1Head, snake1Body, snake2Head, snake2Body) { 
  //checking if the snake1 hit the walls
  if (snake1Head[0] > width || snake1Head[0] < 0 || snake1Head[1] > height || snake1Head[1] < 0) {
    gameOver = true;
  }

  //testing if a snake collides with their body
  for (let i = 1; i < snake1Body.length; i++) {
    if (snake1Head[0] == snake1Body[i][0] && snake1Head[1] == snake1Body[i][1]) {
      gameOver = true;
    }
  }
  
  //testing for snakes colliding with each other
  for (let i = 0; i < body2.length; i++) {
    //snake 1 hitting snake 2 or heads hitting
    if (head1[0] == body2[i][0] && head1[1] == body2[i][1] || head1[0] == head2[0] && head1[1] == head2[1]) {
      gameOver = true;
    }
    //snake 2 into snake 1
    for (let i = 0; i < body.length; i++) {
      if (head2[0] == body[i][0] && head2[1] == body[i][1]) {
        gameOver = true;
      }
    }
  }
}

//this simple function displays the food
function food() {
  fill(255, 0, 0);
  rect(foodX, foodY, 15, 15);
  noFill();

}

function food2() {
  fill(255, 0, 0);
  rect(food2X, food2Y, 15, 15);
  noFill();
}

function keyPressed () {
  //player 1's controls
    if (keyCode === UP_ARROW && dir1 !== 1) {
      dir1 = 0;
    } else if (keyCode === DOWN_ARROW && dir1 !== 0) {
      dir1 = 1;
    } else if (keyCode === LEFT_ARROW && dir1 !== 3) {
      dir1 = 2;
    } else if (keyCode === RIGHT_ARROW && dir1 !== 2) {
      dir1 = 3;
    }
  
  //player 2's controls
      if (keyCode === 87 && dir2 !== 1) {
      dir2 = 0;
    } else if (keyCode === 83 && dir2 !== 0) {
      dir2 = 1;
    } else if (keyCode === 65 && dir2 !== 3) {
      dir2 = 2;
    } else if (keyCode === 68 && dir2 !== 2) {
      dir2 = 3;
    }

    //checking if the snake collided with the walls or body
    endGame(Snake.headXY, Snake.body);

}