var bg1;
var bg2;
var soldier1, soldier2;
var soldier1Img, soldier2Img;
var laser, laser2, laserImg1, laserImg2, laserGrp;
var gameState = "play";
var lifeImg;
var life1, life2, life3, life4, life5, life6;
var hurtSound;
var laserShoot1;
var laserShoot2;
var gameOverSound;
var reset, resetImg;
var next, nextImg;

function preload() {
  bg1 = loadImage("images/background.jpeg");
  bg2 = loadImage("images/backgroundlvl2.jpeg");
  soldier1Img = loadImage("images/soldier1.png");
  soldier2Img = loadImage("images/soldier2.png");
  laserImg1 = loadImage("images/laser.png");
  laserImg2 = loadImage("images/laser2.png");
  hurtSound = loadSound("Music/Hurt.ogg");
  laserShoot1 = loadSound("Music/Laser.wav");
  laserShoot2 = loadSound("Music/laserShoot.wav");
  gameOverSound = loadSound("Music/levelCross.wav");
  resetImg = loadImage("images/reset.png");
  lifeImg = loadImage("images/life.png");
  nextImg = loadImage("images/next.png");
}

function setup() {
  createCanvas(800,600);

  soldier1 = createSprite(200,450,10,10);
  soldier1.addImage(soldier1Img);
  soldier1.scale = 0.3;
  soldier1.setCollider("rectangle",-150,0,150,550);

  laser = createSprite(330,465,10,10);
  laser.addImage(laserImg1);
  laser.scale = 0.2;
  laser.visible = false;

  laser2 = createSprite(330,465,10,10);
  laser2.addImage(laserImg2);
  laser2.scale = 0.15;
  laser2.visible = false;

  soldier2 = createSprite(600,450,10,10);
  soldier2.addImage(soldier2Img);
  soldier2.scale = 0.35;
  soldier2.setCollider("rectangle",150,0,150,480);

  reset = createSprite(380,370,200,200);
  reset.addImage(resetImg);
  reset.scale = 0.2;
  reset.visible = false;

  next = createSprite(380,450,100,100);
  next.addImage(nextImg);
  next.scale = 0.2;
  next.visible = false;

  life1 = createSprite(20,20);
  life1.addImage(lifeImg);
  life1.scale = 0.1;

  life2 = createSprite(45,20);
  life2.addImage(lifeImg);
  life2.scale = 0.1;

  life3 = createSprite(70,20);
  life3.addImage(lifeImg);
  life3.scale = 0.1;

  life4 = createSprite(725,20);
  life4.addImage(lifeImg);
  life4.scale = 0.1;

  life5 = createSprite(750,20);
  life5.addImage(lifeImg);
  life5.scale = 0.1;

  life6 = createSprite(775,20);
  life6.addImage(lifeImg);
  life6.scale = 0.1;

  laserGrp = new Group();
}

function draw() {
  if (gameState === "play") {

    background(bg2);

    if (keyDown("UP_ARROW") && soldier2.y > 95){
      soldier2.y -= 10;
    }

    if (keyDown("RIGHT_ARROW") && soldier2.x < 730){
      soldier2.x += 10;
    }

    if (keyDown("DOWN_ARROW") && soldier2.y < 505){
      soldier2.y += 10;
    }

    if (keyDown("LEFT_ARROW") && soldier2.x > 85){
      soldier2.x -= 10;
    }

    if (keyDown("w") && soldier1.y > 89) {
      soldier1.y -= 10;
    }

    if (keyDown("a") && soldier1.x > 60) {
      soldier1.x -= 10;
    }

    if (keyDown("s") && soldier1.x < 732) {
      soldier1.x += 10;
    }

    if (keyDown("z") && soldier1.y < 518) {
      soldier1.y += 10;
    }

    if (keyDown("space")) {
      if (frameCount % 20 === 0) {
        laser = createSprite(soldier1.x + 155,soldier1.y + 15,10,10);
        laser.addImage(laserImg2);
        laser.scale = 0.15;
        laserGrp.add(laser);
        laser.velocityX = 10;
        laserShoot1.play();
      }
    }

    if (keyDown("l")) {
      if (frameCount % 20 === 0) {
        laser = createSprite(soldier2.x - 150,soldier2.y - 30,10,10);
        laser.addImage(laserImg1);
        laser.scale = 0.2;
        laserGrp.add(laser);
        laser.velocityX = -10;
        laserShoot1.play();
      }
    }

    if ((laser.x > width || laser.x < (width - width)) || (laser.y > height || laser.y < (height - height))) {
      laserGrp.destroyEach();
    }

    if (laserGrp.isTouching(soldier1) && life3.visible === true) {
      hurtSound.play();
      laserGrp.destroyEach();
      life3.visible = false;
    }

    if (laserGrp.isTouching(soldier1) && life2.visible === true) {
      hurtSound.play();
      laserGrp.destroyEach();
      life2.visible = false;
    }

    if (laserGrp.isTouching(soldier1) && life1.visible === true) {
      hurtSound.play();
      laserGrp.destroyEach();
      life1.visible = false;
      gameState = "end";
      soldier1.visible = false;
      gameOverSound.play();
    }

    if (laserGrp.isTouching(soldier2) && life4.visible === true) {
      hurtSound.play();
      laserGrp.destroyEach();
      life4.visible = false;
    }

    if (laserGrp.isTouching(soldier2) && life5.visible === true) {
      hurtSound.play();
      laserGrp.destroyEach();
      life5.visible = false;
    }

    if (laserGrp.isTouching(soldier2) && life6.visible === true) {
      hurtSound.play();
      laserGrp.destroyEach();
      life6.visible = false;
      gameState = "end";
      soldier2.visible = false;
      gameOverSound.play();
      next.visible = true;
    }

    if (mousePressedOver(next)) {
      console.log('Next Button Clicked!');
        //nextLvl();
    }

    fill("yellow");
    textSize(15);
    text("Soldier1", soldier1.x - 50, soldier1.y - 90);
    text("Soldier2", soldier2.x - 25, soldier2.y - 95);
  }

  if (gameState === "end") {
    if (life1.visible === false) {
      fill(0,0,200);
      background("green");
      textSize(32);
      text("SOLDIER 2 WINS!", 250, 300);
      soldier2.visible = true;
    }
  
    if (life6.visible === false) {
      fill(0,0,200);
      background("green");
      textSize(32);
      text("SOLDIER 1 WINS!", 250, 300);
      soldier1.visible = true;
    }
  }

  if (gameState === "playlvl2") {
    background(bg1);

    if (keyDown("UP_ARROW") && soldier2.y > 95){
      soldier2.y -= 10;
    }

    if (keyDown("RIGHT_ARROW") && soldier2.x < 730){
      soldier2.x += 10;
    }

    if (keyDown("DOWN_ARROW") && soldier2.y < 505){
      soldier2.y += 10;
    }

    if (keyDown("LEFT_ARROW") && soldier2.x > 85){
      soldier2.x -= 10;
    }

    if (keyDown("w") && soldier1.y > 89) {
      soldier1.y -= 10;
    }

    if (keyDown("a") && soldier1.x > 60) {
      soldier1.x -= 10;
    }

    if (keyDown("s") && soldier1.x < 732) {
      soldier1.x += 10;
    }

    if (keyDown("z") && soldier1.y < 518) {
      soldier1.y += 10;
    }

    if (keyDown("space")) {
      if (frameCount % 20 === 0) {
        laser = createSprite(soldier1.x + 155,soldier1.y + 15,10,10);
        laser.addImage(laserImg2);
        laser.scale = 0.15;
        laserGrp.add(laser);
        laser.velocityX = 10;
        laserShoot1.play();
      }
    }

    if (keyDown("l")) {
      if (frameCount % 20 === 0) {
        laser = createSprite(soldier2.x - 150,soldier2.y - 30,10,10);
        laser.addImage(laserImg1);
        laser.scale = 0.2;
        laserGrp.add(laser);
        laser.velocityX = -10;
        laserShoot1.play();
      }
    }

    if ((laser.x > width || laser.x < (width - width)) || (laser.y > height || laser.y < (height - height))) {
      laserGrp.destroyEach();
    }

    if (laserGrp.isTouching(soldier1)) {
      hurtSound.play();
      laserGrp.destroyEach();
    }

    if (laserGrp.isTouching(soldier2)) {
      hurtSound.play();
      laserGrp.destroyEach();
    }

    fill("yellow");
    textSize(15);
    text("Soldier1", soldier1.x - 50, soldier1.y - 90);
    text("Soldier2", soldier2.x - 25, soldier2.y - 95);
  }

  drawSprites();
}

function restart() {
  gameState = "play";

  soldier1.visible = true;
  soldier1.x = 200;
  soldier1.y = 450;
  
  soldier2.visible = true;
  soldier2.x = 600;
  soldier2.y = 450;

  reset.visible = false;
  next.visible = false;
}

function nextLvl() {
  background(bg1);
  gameState = "playlvl2";

  soldier1.visible = true;
  soldier2.visible = true;

  reset.visible = false;
  next.visible = false;
}