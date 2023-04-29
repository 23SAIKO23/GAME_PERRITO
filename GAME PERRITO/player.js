 import { Sitting, Running, Jumping, Falling, Rolling, Diving, Hit } from './playerStates.js';
 import { CollisionAnimation } from './collisionAnimation.js';
 export class Player {
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin; //C
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game)];

    }
    update(input, deltaTime ){
        this.checkCollision();

        this.currentState.handleInput(input);
        //movimiento horizontal
        this.x += this.speed; 
        if (input.includes('ArrowRight'))this.speed = this.maxSpeed;      //caminar adelante  
        else if (input.includes('ArrowLeft'))this.speed = -this.maxSpeed;  //caminar atras  
        else this.speed = 0;    //hace que si no precionas se queda estatico
        // horizontal boundaries
        
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width; //con estos if hace,mos q no podemos salirnos del borde
        // movimiento vertical
        //if(input.includes('ArrowUp') && this.onGround()) this.vy -= 30;
        this.y +=this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;

        //vertical boundaries
        if (this.y > this.game.height - this.height - this.game.groundMargin) this.y - this.game.height - this.height - this.game.groundMargin;

        //sprite animation
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
 
    }
    draw(context){
        if ( this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);

        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height ); 
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin; //A   
    }
    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();

    }
    checkCollision(){
        this.game.enemies.forEach(enemy =>{
            if (
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height  > this.y
            ){
                //collision detected
                enemy.markedForDeletion = true;
                this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                if(this.currentState === this.states[4] || this.currentState === this.states[5]){
                    this.game.score++;

                }else {
                    this.setState(6, 0);
                }
                
            }

        });
    }


} 