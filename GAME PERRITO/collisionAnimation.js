export class CollisionAnimation{
    constructor(game, x, y){
        this.game = game;
        this.image = document.getElementById('collisionAnimation');
        this.spritWidth = 100;
        this.spriteHeight = 90;
        this.sizeModefier = Math.random() + 0.5;
        this.width = this.spriteWidth * this.sizeModefier;
        this.Height = this.spriteHeight * this.sizeModefier;
        this.x = x - this.width * 0.5;
        this.y = y - this.width * 0.5;
        this.frameX = 0;   
        this.maxFrame = 4;
        this.markedForDeletion = false;
    }
    draw(context){ 
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0 , this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);

    }
    update(){
        this.x -= this.game.speed;
    }
}