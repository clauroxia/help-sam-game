var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

// Create wall variables 
var wall1 = createSprite(195,120,260,3);
var wall2 = createSprite(195,260,260,3);
var wall3 = createSprite(67,146,3,51);
var wall4 = createSprite(67,234,3,51);
var wall5 = createSprite(323,146,3,51);
var wall6 = createSprite(323,234,3,51);
var wall7 = createSprite(41,170,50,3);
var wall8 = createSprite(41,210,50,3);
var wall9 = createSprite(347,210,50,3);
var wall10 = createSprite(347,170,50,3);
var wall11 = createSprite(18,190,3,40);
var wall12 = createSprite(370,190,3,40);

// Create live and gameState variables
var live = 5;
var gameState = "start";

// Call the function that paint walls 
wallColor(wall1);
wallColor(wall2);
wallColor(wall3);
wallColor(wall4);
wallColor(wall5);
wallColor(wall6);
wallColor(wall7);
wallColor(wall8);
wallColor(wall9);
wallColor(wall10);
wallColor(wall11);
wallColor(wall12);


// Function that put color to wall variables
function wallColor(sprite) {
  sprite.shapeColor = "black";
}

// Create ding (Sam) variable
var ding = createSprite(40,190,13,13);
ding.shapeColor = "blue";

// Create dong (cars) variables
var dong1 = createSprite(100,130,10,10);
dong1.shapeColor = "red";
var dong2 = createSprite(220,130,10,10);
dong2.shapeColor = "red";
var dong3 = createSprite(160,250,10,10);
dong3.shapeColor = "purple";
var dong4 = createSprite(280,250,10,10);
dong4.shapeColor = "purple";


function draw() {
  background("lavender");
  
  // Design the Sam and Optica spots
  strokeWeight(0);
  fill("yellow");
  rect(18,170,50,40);
  rect(320,170,50,40);
  fill("brown");
  text("Vidas: " + live, 270, 110);
  text("Sam", 30, 160);
  text("Óptica", 330, 160);
 
  
  // Initial state of the game
  if (gameState == "start") {
    fill("green");
    textSize(15);
    text("Presione 'Enter' para empezar", 100, 320);
    textSize(12.5);
    text("Usa ⬅  ➡ para que Sam llegue a la  óptica", 80, 350);
    
    
    // Set velocity for dongs and sound for the game
    if (keyDown("enter")) {
      dong1.velocityY = 7;
      dong2.velocityY = 7;
      dong3.velocityY = -7;
      dong4.velocityY = -7;
      playSound("assets/category_digital/boing_2.mp3", true);
      gameState = "play";
    }
  }
  
  
  // Play state of the game
  if (gameState == "play") {
    
    // Set bounce between dongs and walls
    dong1.bounceOff(wall1);
    dong1.bounceOff(wall2);
    dong2.bounceOff(wall1);
    dong2.bounceOff(wall2);
    dong3.bounceOff(wall1);
    dong3.bounceOff(wall2);
    dong4.bounceOff(wall1);
    dong4.bounceOff(wall2);
    
    // Set movement for ding variable (Sam)
    if(keyDown("right")){
      ding.x = ding.x + 2;
    }
    if(keyDown("left")){
      ding.x = ding.x - 2;
    }

    // Set loss of life and final states of the game
    if(ding.isTouching(wall11)||
       ding.isTouching(dong1)||
       ding.isTouching(dong2)||
       ding.isTouching(dong3)||
       ding.isTouching(dong4)) {
      
      playSound("assets/category_hits/retro_game_hit_block_4.mp3");
      ding.x = 40;
      ding.y = 190;
      live -= 1;
    }
    
    if (ding.isTouching(wall12)){
      gameState = "win";
      
    }
    
    if (live == 0) {
      gameState = "lose";
    }
  }
  
  
  // Win state of the game
  if (gameState == "win") {
    ding.x = 365;
    ding.y = 190;
    dong1.velocityY = 0;
    dong2.velocityY = 0;
    dong3.velocityY = 0;
    dong4.velocityY = 0;
    fill("blue");
    textSize(15);
    text("Felicidades, ¡ganaste!", 130, 50);
    stopSound("assets/category_digital/boing_2.mp3");
  }
  
  
  // Lose state of the game
  if(gameState == "lose") {
    dong1.velocityY = 0;
    dong2.velocityY = 0;
    dong3.velocityY = 0;
    dong4.velocityY = 0;
    ding.x = 40;
    ding.y = 190;
    fill("red");
    textSize(15);
    text("No queda vidas", 130, 50);
    stopSound("assets/category_digital/boing_2.mp3");
  }
  
  drawSprites();
}

  

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
