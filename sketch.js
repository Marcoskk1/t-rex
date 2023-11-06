let nuvem;
let trex, trex_correndo, trex_colidindo;
let chao, chaoinvisivel, imagemchao;
let imagemnuvem;
let grupoobstaculo;
let gruponuvem;
let imagemtrex;
let gameover, restart;
let imagemgameover, imagemrestart;
let pontos;
let nuvemaleatoria;
let sommorrer, checkpointsom, pularsom;
let obstaculo;
let obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;
let play = 1;
let end = 0;
let gamestatus = "server";

function preload(){
  trex_correndo = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_colidindo = loadAnimation("trex_collided.png");
  sommorrer = loadSound("die.mp3");
  pularsom = loadSound("jump.mp3");
  checkpointsom = loadSound("checkPoint.mp3");
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  imagemchao = loadImage("ground2.png");
  imagemnuvem = loadImage("cloud.png");
  imagemgameover = loadImage("gameOver.png");
  imagemrestart = loadImage("restart.png");
}

function setup(){
  pontos = 0;
  if(screen.width<400){
    canvas=createCanvas(windowWidth*0.8,windowHeight*0.5);
  }else{
    canvas=createCanvas(windowWidth*0.85,windowHeight*0.5);
  }
    canvas.center();
  
  createCanvas(windowWidth, windowHeight);
  gameover = createSprite(width/2,height/2);

  restart = createSprite(width/2, height/2);

  gameover.addImage(imagemgameover);
  restart.addImage(imagemrestart);
  trex = createSprite(50,height-80, 20,50);//testar quando a imagem
  trex.addAnimation("correr",trex_correndo);
  trex.addAnimation("colidiu",trex_colidindo);
  trex.scale=0.5;
  gameover.scale = 0.5;
  restart.scale=0.08;
  chao = createSprite(width/2, height-70,width*2, 20);
  chao.addImage("chao", imagemchao);
  chao.x=chao.width /2;
  chaoinvisivel = createSprite(width/2, height-60, width, 10);
  chaoinvisivel.visible=false;
  grupoobstaculo = new Group();
  gruponuvem = new Group();
}

function draw(){
  
  if(gamestatus=="server"){
      trex.x=50;
    trex.visible=true;
    trex.y=height-80;
    gameover.visible=false;
      restart.visible=false;
    background("black");
    textSize(40);
    text("Clique para jogar", 100,height/2)
  }else if(gamestatus=="play"){
      //cor de fundo
  background("white")
  //
  trex.setCollider("circle", 0,0,35);
  //
    trex.debug = false;
  stroke("black");
  strokeWeight(2);
  fill("white");
  textSize(16);
  text("Pontuação: " + pontos, width-150, 30);
  //para nascer as nuvens
  nascernuvens();
  //para nascer os obstaculos
  nascerobstaculos();
    chao.velocityX = -(4 + 3*pontos/100);
    pontos = pontos + Math.round(getFrameRate()/60);
    
    if(chao.x<0){
      chao.x=chao.width/2;
    }
    if(grupoobstaculo.isTouching(trex)){
      sommorrer.play();
      gamestatus="fim";
      gameover.visible=true;
      restart.visible=true;
      background("black");
    }
    if ((keyDown("space") || (touches.length > 0)) && trex.y >= height - 100){
      trex.velocityY=-13.5;
      pularsom.play();
      touches=[];
    }else{
      trex.velocityY += 0.8;
      
    }
      
    
  
    
  }else if(gamestatus=="fim"){
    chao.velocityX=0;
     gruponuvem.destroyEach();
  grupoobstaculo.destroyEach();
    trex.velocityY=0;
    trex.visible=false;
    restart.visible=false;
  }
  
if(mouseIsPressed && gamestatus=="server"){
    gamestatus="play";
}else if(mousePressedOver(gameover)&&gamestatus=="fim"){
  reset()


}

  
  trex.collide(chaoinvisivel);
  drawSprites();

  
  
}

function nascernuvens(){
  nuvemaleatoria = Math.round(random(0,575));
  
  if(frameCount%nuvemaleatoria===0){
    nuvem = createSprite(width,60,20,20);
    nuvem.addImage(imagemnuvem);
    nuvem.scale=0.5;
    nuvem.velocityX = -3;
    nuvem.depth = trex.depth;
    trex.depth = trex.depth +1;
    gameover.depth = nuvem.depth;
    nuvem.depth = nuvem.depth -1;
    nuvem.y = Math.round(random(height-600,height-225));
    nuvem.lifetime = 440;
    gruponuvem.add(nuvem);
  }
}

function nascerobstaculos() {
  
  
  if (frameCount % 80 === 0){
   
   obstaculo = createSprite(width+50, height-85, 20, 20); 
   obstaculo.velocityX = -(4+2*pontos/100);
   let naleatorio = Math.round(random(1, 6));
    grupoobstaculo.add(obstaculo) 
    
   switch (naleatorio) {
       
     case 1: obstaculo.addImage (obstaculo1);
       break;
       
    case 2: obstaculo.addImage (obstaculo2);
       break;
       
    case 3: obstaculo.addImage (obstaculo3);
       break;
       
    case 4: obstaculo.addImage (obstaculo4);
       break;
       
    case 5: obstaculo.addImage (obstaculo5);
       break;
       
    case 6: obstaculo.addImage (obstaculo5);
       break;
       
       default: break;
       
      
   }
  
  obstaculo.scale = 0.45
    obstaculo.lifetime = 340

  }
}

function reset(){
  pontos=0;
  gamestatus="server";
  trex.changeAnimation("correr",trex_correndo);
  gruponuvem.destroyEach();
  grupoobstaculo.destroyEach();
}

