var bg,bgImg;
var player, shooterImg, shooter_shooting;
var bullets=20
var score=0
var life =3
var gameState="play"

function preload(){
   
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
   zombie_Img=loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
heart1Img=loadImage("assets/heart_1.png")
heart2Img=loadImage("assets/heart_2.png")
heart3Img=loadImage("assets/heart_3.png")
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
   player.setCollider("rectangle",0,0,300,300)
zombieGroup=new Group();
bulletGroup=new Group();
heart1=createSprite(displayWidth-150,40,20,20);
heart1.addImage(heart1Img)
heart1.scale=0.4
heart2=createSprite(displayWidth-100,40,20,20);
heart2.addImage(heart2Img)
heart2.scale=0.4
heart3=createSprite(displayWidth-150,40,20,20);
heart3.addImage(heart3Img)
heart3.scale=0.4
}

function draw() {
  background(0); 



if (gameState==="play"){
  if (life==3){
    heart1.visible=false
    heart2.visible=false
    heart3.visible=true

    
  }
  if (life==2){
    heart1.visible=false
    heart2.visible=true
    heart3.visible=false

    
  }
  if (life==1){
    heart1.visible=true
    heart2.visible=false
    heart3.visible=false

    
  }
if (life==0){
  heart1.visible=false
    heart2.visible=false
    heart3.visible=false
gameState="end"
}
if (score==100){
  gameState="won"
}



  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 bullet=createSprite(displayWidth-1150,player.y-30,20,10);
 bullet.velocityX=20
 bulletGroup.add(bullet)
 player.depth=bullet.depth
 player.depth+=2
 bullets-=1
  player.addImage(shooter_shooting)
 
}
if (bullets==0){
  gameState="lost"
}
//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
enemies();


if(bulletGroup.isTouching(zombieGroup)){
  for(var i=0;i<zombieGroup.length;i++){
    zombieGroup[i].destroy();
    bulletGroup.destroyEach();
    score=score+2;

  }
 
}

if (zombieGroup.isTouching(player)){
  for(var i=0;i<zombieGroup.length;i++){
    if (zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy();
  
  life=life-1
    }
    
  

  }
}

}
drawSprites();
fill("white")
textSize(20)
text("Bullets: "+bullets,displayWidth-500,50)
text("Score: "+score,displayWidth-500,100)
text("Lives: "+life,displayWidth-500,150)
if (gameState==="end"){
  textSize(100)
 fill("red")
 text("YOU LOST",400,400)
 zombieGroup.destroyEach();
 player.destroy();

}
 else if (gameState==="won"){
  textSize(100)
 fill("green")
 text("YOU WON",400,400)
 zombieGroup.destroyEach();
 player.destroy();

}
else if (gameState==="lost"){
  textSize(100)
 fill("blue")
 text("YOU RAN OUT OF BULLETS",400,400)
 zombieGroup.destroyEach();
 player.destroy();
bulletGroup.destroyEach();


}
}
function enemies(){
  if(frameCount%55===0){
    zombie=createSprite(random(500,1100),random(100,500),40,40);
    zombie.addImage(zombie_Img)
    zombie.scale=0.15
    zombie.velocityX = -3
    //zombie.debug=true
    //zombie.setCollider("rectangle",0,0,600,600)
    zombie.lifetime=400
    zombieGroup.add(zombie)
    

  }
}

