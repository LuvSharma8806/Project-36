//Create variables here
var dog,happyDog;
var database,foodS,foodStock;
var happyDogImg,dogImg;

function preload()
{
  happyDogImg=loadImage("images/dogImg1.png");
  dogImg=loadImage("images/dogImg.png");
  
}

function setup() {
  createCanvas(500,500);
  database=firebase.database();
  dog=createSprite(250,400,10,10);
  dog.addImage(dogImg);
  dog.scale=0.3;

  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
  
}


function draw() {  
  background(46,139,87);

  textSize(20);
fill(0,225,255);
stroke(4);
text("Press up arrow to feed the dog",100,200);
 
textSize(20);
fill(255,255,0);
text("Remaining food " + foodS,10,100); 
if (keyDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  

}

function writeStock(x){
   if (x<=0){
     x=0;
   }
   else{
     x=x-1;
   }
   database.ref("Food").update({
     Food:x
   })
}

function readStock(data){
   foodS=data.val();
}