let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
// cavas.height= 726;
// canvas.width= 1125;
canvas.style.border = '2px solid black'
canvas.style.width= '2650px'
canvas.style.height='1452px'
let startBtn = document.querySelector("#start-btn")
let restartBtn = document.querySelector("#restart-btn")
let cleanEl= document.querySelector('#cleanEl')
let scoreEl= document.querySelector('#scoreEl')
let score=0
let intervalID= 0
// scoreEl.innerHTML= score

let endEl=document.querySelector('#endEl')

let life=3
let lifeEl=document.querySelector('#lifeEl')

let numorc=0
let numorcEl= document.querySelector('#numorcEl')

function init(){
    score=0
    life=3
    numorc=0
    let player= {
        x: 100,
        y: 100,
        width: 16,
        height: 24,
        frameX: 0,
        frameY: 0,
        speed: 1,
        moving: false,
    }
    quiver=[]
    hobbits= [new Hobbit()]
    enemies= [new Orc()]
    arrow= new Arrow(player.x +10,player.y +10, 15, 1,4, canvas.width)
   
}




const backImg = new Image()
backImg.src = './Images/unnamed (1).jpg'

const playerSprite = new Image()
playerSprite.src = './Images/bloodelf_male3 (1).png'

let enemy =document.createElement('img')
enemy.src = './Images/Orc.izq.png'

let hobbit = document.createElement('img')
hobbit.src='./Images/hobbit.rct.png'


let keys= []

const player= {
    x: 100,
    y: 100,
    width: 16,
    height: 24,
    frameX: 0,
    frameY: 0,
    speed: 1,
    moving: false,
}
window.addEventListener("keydown", function(event){
    keys[event.keyCode] = true;
    // player.moving = false
})

window.addEventListener("keyup", function(event){
    delete keys[event.keyCode];
    player.moving = false
})

function movePlayer(){
    //TOP
    if(keys[38] && player.y > 50){
        player.y -= player.speed
        player.moving = true
        player.frameY = 3
    }
    //DOWN
    if(keys[40] && player.y < canvas.height - player.height){
        player.y += player.speed
        player.moving = true
        player.frameY = 0
    }
    //RIGHT
    if(keys[39] && player.x < canvas.width - player.width){
        player.x += player.speed
        player.moving = true
        player.frameY= 2
    }
    //LEFT
    if(keys[37] && player.x > 0){
        player.x -= player.speed
        player.moving = true
        player.frameY= 1
    }
}

/////////////////////////////   


////////////////
//draw a rectangle
///


class Arrow {
    constructor(x,y,width, height,speed, moving){
        this.x = player.x +10;
        this.y = player.y +10;
        this.width= 15;
        this.height= 1;
        this.speed= 4;
        this.moving=canvas.width;		
    }
    drawArrow(){
        ctx.beginPath()
            ctx.fillStyle= 'brown'
            ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.closePath()
    }
}

let arrow= new Arrow(player.x +10,player.y +10, 15, 1,4, canvas.width)
let quiver=[]

function throwArrow(){
        for (i = 0; i < quiver.length; i++){
            quiver[i].drawArrow()
            quiver[i].x++
        }
 }

document.addEventListener('keydown', function(event){
    if(event.keyCode=="32"){
        quiver.push(new Arrow())
    }
 })

 //ORC
class Orc {
    constructor(x,y,width, height, speed){
        this.x = canvas.width;
        this.y = Math.random()* (50 - 110) + 110 ;
        this.width= 41;
        this.height= 60;
        this.speed= 1	
    }
    drawEnemy(){
        ctx.drawImage(enemy, this.x, this.y, 30, 50);
        }
    }
    
    let enemies= [new Orc(),]
    //let numberOfEnemies = Math.random()*(1 - 2) + 1;
    
    function spawnEnemies(){
    
           for (i = 0; i < enemies.length; i++){
               enemies[i].drawEnemy()
            //    if (enemies[i].x == 170) {
            //      enemies.push(new Orc(), );
            //    }
               enemies[i].x--
           }
    }

//HOBBIT
class Hobbit {
    constructor(x,y,width, height, speed){
        this.x = canvas.width;
        this.y = Math.random()* (50 - 110) + 110 ;
        this.width= 10;
        this.height= 21;
        this.speed= 1	
    }
    drawHobbit(){
        ctx.drawImage(hobbit, this.x, this.y, 15, 25);
        }
    }
    
    let hobbits= [new Hobbit()]
    //let numberOfEnemies = Math.random()*(1 - 2) + 1;
    
    function spawnHobbits(){
    
           for (i = 0; i < hobbits.length; i++){
            hobbits[i].drawHobbit()
               if (hobbits[i].x == 10) {
                hobbits.push(new Hobbit());
               }
               hobbits[i].x--
           }
        
    }
//////////////////
//TOQUEN DESAPAREZCA


//////////////////
//PUNTOS


//////////////////

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
	ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

        
function animate(){
    ctx.clearRect(0, 0,canvas.width, canvas.height);
    ctx.drawImage(backImg,0, 0,canvas.width, canvas.height);
    drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY,player.width, player.height, player.x, player.y,player.width,player.height)

    
    movePlayer()
    spawnEnemies()
    throwArrow()
    spawnHobbits()
  

    for(let j=0; j<enemies.length;j++){
        for (let i = 0; i < quiver.length; i++){
            if(quiver[i].x <enemies[j].x + enemies[j].width &&
                quiver[i].x + quiver[i].width> enemies[j].x && 
                quiver[i].y < enemies[j].y + enemies[j].height &&
                quiver[i].y + quiver[i].height>enemies[j].y){
                    enemies.splice(j,1);
                    quiver.splice(i, 1)
                    // enemies[i].x = -20
                    //console.log('colission')
                    enemies.push(new Orc())
                    score +=10
                    scoreEl.innerHTML= score
                    numorc +=1
                    numorcEl.innerHTML= numorc
                }
        }
    }


    for(let j=0; j<hobbits.length;j++){

        for (let i = 0; i < quiver.length; i++){
            if(quiver[i].x <hobbits[j].x + hobbits[j].width &&
                quiver[i].x + quiver[i].width> hobbits[j].x && 
                quiver[i].y < hobbits[j].y + hobbits[j].height &&
                quiver[i].y + quiver[i].height>hobbits[j].y){
                    hobbits.splice(j,1);
                    quiver.splice(i, 1)
                    // enemies[i].x = -20
                    //console.log('colission')
                    hobbits.push(new Hobbit())
                    score -=5
                    scoreEl.innerHTML= score
                    life -=1
                    lifeEl.innerHTML= life
                }
        }
    }
// ctx.beginPath()
//     ctx.font = '18px Verdana'
//     ctx.fillText('Score: ' + score, 10, canvas.height - 130)
// ctx.closePath() 



    if(life<0){
        
        
        // requestAnimationFrame(animate)
        // endEl.style.display ='none'
        // scoreEl2.innerHTML=score
        clearInterval(intervalID)
        gameOver()
    }

}

function gameOver(){
    canvas.style.display = 'none'
    cleanEl.style.display = 'none';
    endEl.style.display = 'block'

    restartBtn.addEventListener('click', () => {
        console.log('click')
        init();
        startGame();        

    })

}

function startGame(){
    //console.log('start game')
    cleanEl.style.display = 'none'
    endEl.style.display = 'none'
    canvas.style.display = 'block'
    


    intervalID= setInterval(() => {
        //console.log('works')
        requestAnimationFrame(animate)
    }, 30)

}



// restartBtn.addEventListener("click", function() {
//     setInterval(() => {
//         requestAnimationFrame(animate)
//     }, 30)
//     endEl.style.display ='none'
// })


window.addEventListener('load', () => {
    canvas.style.display = 'none';
    cleanEl.style.display = 'block';
    endEl.style.display = 'none'

    startBtn.addEventListener("click", function() {
        startGame()       
})


})