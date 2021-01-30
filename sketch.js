var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, player_running, player_collided;
var ground, invisibleGround, groundImage;


var obstaclesGroup, obstacle;

var score=0;

var gameOver, gameoverImg, restart , restartImg;
var ground1 , groundImg;



function preload(){
  player_running =   loadAnimation("images/p1.png","images/p.png","images/pc2.png");
  player_collided = loadImage("images/ps.png");
  
  groundImage = loadImage("images/bg1.png");
  groundImg = loadImage("images/ground.png");
  
  
  obstacle = loadImage("images/ob.png");
  
  
  gameOverImg = loadImage("images/gameover.png");
  restartImg = loadImage("images/restart.png");
}

function setup() {
  createCanvas(600, 600);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  
  ground1 = createSprite(200,220,600,20);
  ground1.addImage("ground1",groundImg);
  
  player = createSprite(50,350,20,50);
  
  player.addAnimation("running", player_running);
  player.addImage("collided", player_collided);
  player.scale = 0.5;
  
  
  invisibleGround = createSprite(200,400,400,10);
  invisibleGround.visible = false;
  
  
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //player.debug = true;
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground1.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && player.y >= 159) {
      player.velocityY = -12;
    }
  
    player.velocityY = player.velocityY + 0.5
  
    if (ground1.x < 0){
      ground1.x = ground1.width/2;
    }
  
    player.collide(invisibleGround);
    
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(player)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    
    //change the player animation
    player.changeImage("collided",ps);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}



function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600,350,40,10);
    obstacle.y = Math.round(random(80,120));
    obstacle.addImage(obstacle);
    obstacle.scale = 0.5;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    obstacle.depth = ground.depth;
    ground.depth = ground.depth + 1;
    
    //add each obstacle to the group
    obstaclesGroup.add(cloud);
  }
  
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  
  player.changeAnimation("running",player_running);
  
  
  score = 0;
  
}