var ghost, ghostImage;
var tower, towerImage, ledge, ledgeImage, ledgeGroup, door, doorImage, doorGroup, invisibleLedge, invGroup;
var gameState = "play";

function preload(){
  ghostImage = loadImage("ghost-standing.png");
  towerImage = loadImage("tower.png");
  ledgeImage = loadImage("climber.png");
  doorImage = loadImage("door.png");
}


function setup(){
  createCanvas(500, 500);
  ledgeGroup = createGroup();
  doorGroup = createGroup();
  invGroup = createGroup();
  
  tower = createSprite(250, 250, 500, 500);
  tower.addImage("tower", towerImage);
  tower.scale = 0.8;
  tower.velocityY = 2;
  
  ghost = createSprite(250, 400, 30, 30);
  ghost.addImage("ghost", ghostImage);
  ghost.scale = 0.3;
  ghost.setCollider("rectangle", 0, 0, 50, ghost.height);
  //ghost.debug = true;
}


function draw(){
  background("black");
  if(gameState === "play"){
    
    if(tower.y>500){
      tower.y = 250;
    } 
    
    if(keyDown("a")){
      ghost.x = ghost.x-2;
    }
    
    if(keyDown("d")){
      ghost.x = ghost.x+2;
    }
    
    if(keyDown("w")){
      ghost.y = ghost.y-2;
    }
    
    if(keyDown("s")){
      ghost.y = ghost.y+2;
    }
    
    doors();
    
    if(invGroup.isTouching(ghost)){
      gameState = "end";
      tower.velocityY = 0;
      
      doorGroup.setVelocityYEach(0);
      doorGroup.setLifetimeEach(-1);
      
      ledgeGroup.setVelocityYEach(0);
      ledgeGroup.setLifetimeEach(-1);
      
      invGroup.setVelocityYEach(0);
      invGroup.setLifetimeEach(-1);
    }
    
    if(ledgeGroup.isTouching(ghost)){
      
      ghost.x = door.x;
      ghost.destroy();
      
      tower.velocityY = 0;
      
      doorGroup.setVelocityYEach(0);
      doorGroup.setLifetimeEach(-1);
      
      ledgeGroup.setVelocityYEach(0);
      ledgeGroup.setLifetimeEach(-1);
      
      invGroup.setVelocityYEach(0);
      invGroup.setLifetimeEach(-1);
    }
      
    }
  
  drawSprites();
  
  if(gameState === "end"){
      
      textSize(30);
      fill("yellow");
      text("GAME OVER", 175, 250);
      
  }
}


function doors(){
  if(frameCount%100===0){
    door = createSprite(Math.round(random(100, 400)), -70, 30, 30);
    door.addImage("door", doorImage);
    door.velocityY = 2;
    door.lifetime = 300;
    door.depth = ghost.depth-1;
    doorGroup.add(door);
    
    ledge = createSprite(door.x, 0, 30, 30);
    ledge.addImage("ledge", ledgeImage);
    ledge.velocityY = 2;
    ledge.lifetime = 250;
    ledge.depth = ghost.depth-1;
    ledgeGroup.add(ledge);
    
    invisibleLedge = createSprite(door.x, ledge.y+10, ledge.width, 2);
    invisibleLedge.velocityY = 2;
    invisibleLedge.visible = false;
    
    invGroup.add(invisibleLedge);
  }
  
  
}