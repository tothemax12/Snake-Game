//SNAKE GAME
//BY MAX ANDERSON 2020

let Snake = new snake();

let foodX;
let foodY;
let dir1;
let click = false;
let button1Pressed = false;
let button2Pressed = false;
let button3Pressed = false;
let alpha = 0;
let subtractAlpha = false;

//1 player game declarations
let Snake1P = new snake();

let count = 0;
let gameOver = false;
let score1P;
let foodX1P;
let foodY1P;
let dir11P;

function setup() {
  createCanvas(405, 405);
  
    //initializing random spots for the food
    foodX = 0;
    foodY = 75;
  
  //Snake.body.push(new Snake.segment(40, 30).segmentXY);
}

function draw() {
  background(0);
  
  //fading the logo in
  if (alpha<255) {
    alpha += 5;
  }
  
    for (let i = 0; i <= width; i += 15) {
      line(0, i, width, i);
      line(i, 0, i, height);
    }

  //border
  stroke(255, 255, 255, alpha)
  rect(0, 0, 405, 405);
  rect(5, 5, 395, 395);
  
  //buttons
  stroke(255, 255, 255, alpha);
  
    if (mouseX >= 150 && mouseX <= 250 && mouseY >= 150 && mouseY <= 200 && !button1Pressed && !button2Pressed && !button3Pressed) {
    fill(0, 255, 0, 200);
    rect(151, 151, 99, 49);
    subtractAlpha = true; //fade the buttons out
  }
  
  noFill();
  rect(150, 150, 100, 50, 4);
  text("1 Player", 174, 180);
  

  if (mouseX >= 150 && mouseX <= 250 && mouseY >= 210 && mouseY <= 260 && !button1Pressed && !button2Pressed && !button3Pressed) {
    fill(0, 255, 0, 200);
    rect(151, 211, 99, 49);
    subtractAlpha = true;
  }
  
  
  noFill();
  rect(150, 210, 100, 50, 4);
  text("2 Player", 174, 238);
  
  if (mouseX >= 150 && mouseX <= 250 && mouseY >= 270 && mouseY <= 320 && !button1Pressed && !button2Pressed && !button3Pressed) {
    fill(0, 255, 0, 200);
    rect(151, 271, 99, 49);
    subtractAlpha = true;
  }
  
  noFill();
  rect(150, 270, 100, 50, 4);
  text("Info", 174, 298);
  stroke(0);
  
  //if a button is pressed, fade out
  if (alpha > 0 && (button1Pressed || button2Pressed || button3Pressed) && Snake.body[71][0] < -30) {
     console.log("test");
    console.log(Snake.body[0][0]);
    // if (Snake.body[71][0] == 30) {
    // console.log("end of snake!");
    // }
      alpha -= 20;
  }
  
  //end of buttons----------------------------------
  
  
  //credits
  stroke(255, 0, 0, alpha);
  text("Created By Max Anderson 2020", 200, 105);
  stroke(0);
  
  //this code runs programs in the snake object
  if (click && (button1Pressed || button2Pressed || button3Pressed)) {
    Snake.snakeUpdate();
  }
  
  //handling when a button is pressed
  if (button1Pressed) {
    console.log("button 1 pressed!");
    //singlePlayerGame();
  } else if (button2Pressed) {
    console.log("button 2 pressed!");
  } else if (button3Pressed) {
    console.log("button 3 pressed!");
  }
  
    Snake.move();
    Snake.display();
    Snake.eat();
      
    food();
}

//this is the code for the snake
function snake() {
  this.headXY = [15, 75];

  //custom placed snake
  this.body = [this.headXY, [30, 75], [45, 75], [45, 60], [45, 45], [30, 45], [15, 45], [15, 30], [15, 15], [30, 15], [45, 15], [60, 15], [75, 15], [75, 30], [75, 45], [75, 60], [75, 75], [75, 60], [90, 15], [105, 15], [120, 15], [120, 30], [120, 45], [120, 60], [120, 75], [135, 75], [150, 75], [150,  60], [150, 45], [150, 30], [150, 15], [165, 15], [180, 15], [195, 15], [195, 30], [195, 45], [180, 45], [165, 45], [180, 45], [195, 45], [195, 60], [195, 75], [210, 75], [225, 75], [225, 60], [225, 45], [225, 30], [225, 15], [240, 45], [255, 60], [270, 75], [255, 30], [270, 15], [285, 15], [300, 15], [315, 15], [330, 15], [345, 15], [300, 30], [300, 45], [315, 45], [330, 45], [345, 45] , [300, 60], [300, 75], [315, 75], [330, 75], [345, 75], [360, 75], [375, 75], [375, 90], [375, 105]];

  this.segment = function(segX, segY) {
    this.segmentXY = [segX, segY];
    rect(segX, segY, 15, 15);
  }

  this.display = function() {
    let length = this.body.length - 1;
    frameRate(30);
    fill(0, 255, 0, alpha);

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
    //new spot for food off of screen
    foodX = 500;
    foodY = 500;

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
  fill(255, 0, 0, alpha);
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

function mousePressed() {
  console.log(mouseX, mouseY);
  click = true;
  
  if (click) {
  if (mouseX >= 150 && mouseX <= 250 && mouseY >= 150 && mouseY <= 200) {
  button1Pressed = true;
  } else if (mouseX >= 150 && mouseX <= 250 && mouseY >= 210 && mouseY <= 260) {
  button2Pressed = true;
  } else if (mouseX >= 150 && mouseX <= 250 && mouseY >= 270 && mouseY <= 320) {
  button3Pressed = true;
  }  
  dir1 = 2; 
  }
}

function hoverButtons(x, y, buttonWidth, buttonHeight) {

  if (mouseX >= x && mouseX <= x+width) {
    stroke(255, 0, 0);
  }
}
/*
function singlePlayerGame() {
   background(0);
  //if the variable gameOver becomes true display the text and the score
  //the if statement on line 16 is the same as saying if(gameOver === true)
  if (gameOver) {
    score = SnakeP1.body.length;
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
*/