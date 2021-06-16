var PLAY = 1;
var END = 0;
var gameState = PLAY;

var green2,greenImg,invisibleGround,gover;

var mushroom,mushroomImg,mGroup;

var marioImg,mario;

var bowserImg,bowser,bowserG;

var birdImg,bird,birdGroup,jumgI,leftI, rightI,attackI;

var score = 0;

var gameover,gameOverSound,jumpS,point,jump,left,right,attack;

var life1,life2,life3,life = 0;

function preload(){

   //optional background Img
   green2 = loadImage("images/Green.png");
  
   //images for mobile button
   leftI = loadImage("images/left.png");
   rightI = loadImage("images/right.png");
   attackI = loadImage("images/attack.png");
   
   //mario animation img
   marioImg = loadAnimation("images/run-1.png","images/run-2.png","images/run-3.png","images/run-4.png","images/run-5.png");
  
   bowserImg = loadImage("images/Bowser.png");
  
   birdImg = loadImage("images/bird.png");
  
   gover = loadImage("images/gover.png");
  
   gameOverSound = loadSound("sounds/gameover.wav");
  
   jumpS = loadSound("sounds/jump01.wav");

   point = loadSound("sounds/point.wav")
  
   mushroomImg = loadImage("images/mushrooom.png");

}

    function setup() {
      createCanvas(400,400);
      
          //optional background
          greenImg = createSprite(200,200,20,20);
          greenImg.addImage(green2);
          greenImg.scale = 1.9;

          //gameover Img
          gameover = createSprite(200,200,600,600)
          gameover.addImage(gover);
          
          //lifes
          life1 = createSprite(20,10,15,15);
          life1.addImage(mushroomImg);
          life1.scale = 0.1;
          
          life2 = createSprite(50,10,15,15);
          life2.addImage(mushroomImg);
          life2.scale = 0.1;

          life3 = createSprite(80,10,15,15);
          life3.addImage(mushroomImg);
          life3.scale = 0.1;
          
          //for creating mario
          mario = createSprite(60,340,10,10);
          mario.addAnimation("running",marioImg);
          mario.scale = 0.5;
          
          //invisible ground
          invisibleGround = createSprite(200,370,600,10)
          invisibleGround.velocityX = -(12 + 3*score/100);
      
          //groups
          //birds group
          birdGroup = new Group();
          
          //bowser group
          bowserG = new Group();
          
          //mushroom group
          mGroup = new Group();
    }

function draw() {
  background("black");

          //for repeating background which we are currently mot using lol 😂
          if (greenImg.x < 0) 
                  {
                    greenImg.x = 100;
                  }
          
          //fro repeating invisible ground        
          if (invisibleGround.x < 0) 
                  {
                    invisibleGround.x = 100;
                  }
        
          invisibleGround.visible = false;
  
  if (gameState === PLAY)
      {
            //for spawing bowser and bird
            spawnBowser();
            spawnBird();

            //to visible mario
            mario.visible = true;

            //to invisible gameover image
            gameover.visible = false;
        
        if(keyWentDown("m")) {
          //for shooting mushrooms
          createMushrooms();
        }
        
        if(mGroup.isTouching(bowserG))
                {
                  //to destroy bowser if mushroom touches it
                  mGroup.destroyEach();
                  bowserG.destroyEach();
                }
        
        if(mGroup.isTouching(birdGroup))
                {
                  //to end the game if mario accidently kill the bird
                  gameState = END;
                  //for sound
                  gameOverSound.play();
                }
        
        if(keyDown("space") && mario.y >= 320)
                {
                  //to jump mario
                  mario.velocityY = -20; 
                  //for jump sound
                  jumpS.play();
                }
                //for bugs
                mario.velocityY = mario.velocityY + 1.0;
                
        //these are mobile controls
        if (keyDown("RIGHT")) 
                {
                  mario.x = mario.x + 2;
                  greenImg.velocityX = -2;
                }
          
        if (keyDown("LEFT")) 
                {
                  mario.x = mario.x - 2;
                }
        
        if(birdGroup.isTouching(mario))
                {
                  birdGroup.destroyEach();
                  score = score + 1;
                  point.play();
                }
      
        //to lose 1 life if mario touches bowser
        if(bowserG.isTouching(mario))
                { 
                  life = life - 1;
                  console.log(life);
                  bowserG.destroyEach();
                } 

        //for lifes        
        if(life === 2)
                {
                  life3.visible = false;
                }

        if(life === 1)
                {
                  life2.visible = false;
                }
        
        if(life === 0)
                {
                  // to end the game
                  life1.visible = false;
                  gameOverSound.play();
                  bowserG.setVelocityEach(0);
                  birdGroup.setVelocityEach(0); 
                  mario.visible = false;
                  gameState = END;
                }


      }
  
  if(gameState === END) 
        {
          gameover.visible = true;
          bowserG.destroyEach();
          birdGroup.destroyEach();
          mGroup.destroyEach();
          bowserG.setLifetimeEach(-1);
          birdGroup.setLifetimeEach(-1);
          
          if(mousePressedOver(gameover)){
          reset();
        }
        }
        mario.collide(invisibleGround);
        drawSprites();
        text("Score: " + score,340,20);
}


function spawnBowser()
  {
    if(frameCount % 80 === 0) 
        {
          //to spawn bowser
          var bowser = createSprite(399,340,10,10);
          bowser.addImage(bowserImg);
          bowser.scale = 0.1;
          bowser.velocityX = -5;
          bowser.x = Math.round(random(200,400));
          bowser.lifetime = 200;
          
          bowserG.add(bowser);
        }
  }

function spawnBird()
  {
      if(frameCount % 100 === 0) 
        {
          //to spawn birds
        var bird = createSprite(399,30,10,10);
        bird.addImage(birdImg);
        bird.scale = 0.1;
        bird.velocityX = -5;
        bird.y = Math.round(random(100,250));
        bird.lifetime = 100;   
        
        birdGroup.add(bird);
        }
  }

function createMushrooms()
    {
      //for spawning mushrooms
      var mushroom = createSprite(60,340,10,10);
      mushroom.addImage(mushroomImg);
      mushroom.scale = 0.1;  
      mushroom.x = mario.x;
      mushroom.y = mario.y;
      mushroom.velocityX = 3;
      mushroom.lifetime = 150;
      mGroup.add(mushroom)
      
    }

function reset()
    {
      //to reset the game
      gameState = PLAY;
      mario.x = 60;
      mario.y = 340;
      life = 3;
      life3.visible = true;
      life2.visible = true;
      life1.visible = true;
      score = 0;
    }