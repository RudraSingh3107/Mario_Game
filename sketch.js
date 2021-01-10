var PLAY = 1;
var END = 0;
var gameState = PLAY;

var mario, mario_running, mario_collided;
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1, obstacle2;

var score;

var restart, restartImage;

var gameOver, gameOverImage;


function preload(){
  mario_running = loadImage("Mario_Running.png");
  mario_collided = loadImage("Mario_Collided.png");
  
  groundImage = loadImage("Ground.jpg");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("Restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  mario = createSprite(50,180,20,50);
  mario.addImage("running", mario_running);
  mario.addImage("collided" , mario_collided)
  mario.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.scale = 0.5;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(300,50,5,10);
  gameOver.addImage("game over",gameOverImage);
  gameOver.scale = 0.5;
  
  restart = createSprite(300,85,10,5);
  restart.addImage("reset",restartImage);
  restart.scale = 0.3;
  
  obstaclesGroup = createGroup();
  
  mario.setCollider("circle",0,0,40);
  
  score = 0;
}

function draw() {
  background(180);
  
  text("Score: "+ score, 500,50);
  
  text(mouseX + "," + mouseY,mouseX,mouseY);
  
  console.log("this is ",gameState);
  
  
  if(gameState === PLAY){
    
    ground.velocityX = -4;
    
    restart.visible = false;
    gameOver.visible = false;
    
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& mario.y >=134) {
        mario.velocityY = -13;
    }
    
    mario.velocityY = mario.velocityY + 0.8
  
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(mario)){
        gameState = END;
        mario.addImage("collided",mario_collided);
    }
  }
   else if (gameState === END) {
     
     restart.visible = true;
     gameOver.visible = true;
     
      ground.velocityX = 0;
     mario.velocityY = 10;
     
      mario.changeImage("collided",mario_collided);
     
     obstaclesGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
   }
  
  mario.collide(invisibleGround);
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -4;
   
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }
           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
 }
}