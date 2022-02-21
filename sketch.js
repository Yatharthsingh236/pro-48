var bg,bgImg;
var player, shooterImg, shooter_shooting,bulletImg;
var zombie, zombieImg, zombieImg2,zombieImg3;
var bullet, bulletGroup,bullets=100;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var gameState="play",life = 3,score = 0;
var zombieGroup;
var lostSound,winSound,explosionSound;



function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  bulletImg=loadImage("assets/bullet1.png")

  zombieImg = loadImage("assets/zombie.png")
  zombieImg2= loadImage("assets/zombie2.png")
  zombieImg3= loadImage("assets/zombie3.png")
  bgImg = loadImage("assets/bg2.jpeg")

  lostSound=loadSound("assets/lose.mp3")
  winSound=loadSound("assets/win.mp3")
  explosionSound=loadSound("assets/explosion.mp3")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,400)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4

   

    //creating group for zombies    
    zombieGroup = new Group();
    bulletGroup = new Group();
}

function draw() {
  background(0); 
if (gameState==="play"){
  if(life===3){
    heart1.visible = false
    heart2.visible = false
    heart3.visible = true
  }
  if(life===2){
    heart1.visible = false
    heart2.visible = true
    heart3.visible = false
  }
  if(life===1){
    heart1.visible = true
    heart2.visible = false
    heart3.visible = false
  }
  //moving the player up and down and making the game mobile compatible using touches
  if(life===0){
    gameState="lost";
  }
  if(score===100){
    gameState="won";
    winSound.play();
  }
if((keyDown("UP_ARROW")||touches.length>0) && player.y > 10){
  player.y = player.y-30
  console.log(player.y);
}
if((keyDown("DOWN_ARROW")||touches.length>0) && player.y < 618){
 player.y = player.y+30
}

}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
//Creating bullet sprite & changing the depth of player to show it above the bullets
  bullet=createSprite(displayWidth-1150,player.y-27,20,10);
  bullet.velocityX=20;
  bullet.addImage("bulletImg",bulletImg);
  bullet.scale=0.4
  bulletGroup.add(bullet);
  player.depth=bullet.depth;
  player.depth=player.depth+1;
  player.addImage(shooter_shooting)
  bullets=bullets-1;
  explosionSound.play();
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
//Creating new gamestate
if(bullets===0){
  gameState="outofbullet"
  lostSound.play();

}
//destroy zombie when bullet touches it
if(zombieGroup.isTouching(bulletGroup)){


  for(var i=0;i<zombieGroup.length;i++){     
       
   if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach();
        explosionSound.play()
        score=score+2;

        } 
  }
 }
//destroy zombie when player touches it
if(zombieGroup.isTouching(player)){
 
lostSound.play();
 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
       life=life-1;
       } 
 }
}

//calling the function to spawn zombies
enemy();

drawSprites();

textSize(27);
fill("white");
text("Score " +score,displayWidth-210,displayHeight/2-270);
text("Life " +life,displayWidth-210,displayHeight/2-240);
text("Bullets " +bullets,displayWidth-210,displayHeight/2-210);

//Displaying message "Oops!You ran out of bullets"
if(gameState==="outofbullet"){
  textSize(30);
  fill("yellow")
  text("Oops!You ran out of bullets",570,370);
  player.destroy();
  bulletGroup.destroyEach();
  zombieGroup.destroyEach();
  
}
if(gameState==="lost"){
  textSize(100);
  fill("red")
  text("You Lost",500,400);
  player.destroy();
  zombieGroup.destroyEach();
}
if(gameState==="won"){
  textSize(100);
  fill("lightgreen")
  text("You won",550,250);
  player.destroy();
  zombieGroup.destroyEach();
  
}
}



//creating function to spawn zombies
function enemy(){
  if(frameCount%60===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",10,10,400,500)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }
  if(frameCount%120===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(zombieImg2)
    zombie.scale = 0.40
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",1,1,400,500)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }
  if(frameCount%144===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(zombieImg3)
    zombie.scale = 0.13
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",1,1,400,500)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }
}
