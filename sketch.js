const GRAVITY = 9;
const JUMP_HEIGHT = 9.0;
const GROUND_HEIGHT = 30;
const WIDTH = 600;
const HEIGHT = 600;
var SCROLL_SPEED = 3;
var SCORE = 0;
var song;
let clouds;
/*function preload()
{
 song = loadSound("Imagine_Dragons_Believer.mp3");
}*/
function setup() {
 createCanvas(WIDTH, HEIGHT);
 //song.play()
}
function getRndInteger(min, max) {
 //https://www.w3schools.com/js/js_random.asp
 return Math.floor(Math.random() * (max - min)) + min;
}
 clouds = [
 {
 x: 100,
 y: 300,
 w: 150,
 h: 40
 },
 { //cloud
 x: 300,
 y: 200,
 w: 100,
 h: 50
 },

 ]
class Bird {
 constructor(x, y, size) {
 this.x = x;
 this.y = y;

 this.size = size;
 this.vely = 0;
 }
 draw() {
 fill("#F44336");
 circle(this.x, this.y, this.size);
 }
 update() {
 this.y += this.vely;
   //this.vely += GRAVITY*0.05;
 this.vely = lerp(this.vely, GRAVITY, 0.05);
 this.y = Math.max(this.size / 2, Math.min(this.y, HEIGHT -
GROUND_HEIGHT - this.size / 2));
 }
 flap() {
 this.vely = -JUMP_HEIGHT;
 }
 checkDeath(pipes) {
 for (var pipe of pipes.pipes_list) {
 if (this.x + this.size / 2 > pipe.x && pipe.height && this.x - this.size /
2 < pipe.x + pipes.width) {
 if (this.y - this.size / 2 <= pipe.height || this.y + this.size / 2 >=
pipe.height + pipes.gap) {
 window.location.reload();
 }
 }
 if (this.x - this.size / 2 > pipe.x + pipes.width && pipe.scored == false)
{
 SCORE += 1;
 pipe.scored = true;
 }
 }
 }
}
class Pipes {
 constructor(width, frequency, gap) {
 this.width = width;
 this.frequency = frequency;
 this.gap = gap;
 this.pipes_list = [
 { x: 500, height: getRndInteger(this.gap, HEIGHT -
GROUND_HEIGHT - this.gap), scored: false },
 { x: 500 + this.width + this.frequency, height: getRndInteger(this.gap,
HEIGHT - GROUND_HEIGHT - this.gap), scored: false }

 ];
 }
 update() {
 for (var pipe of this.pipes_list) {
 pipe.x -= SCROLL_SPEED;
 if (pipe.x + this.width <= 0) {
 pipe.x = WIDTH;
 pipe.height = getRndInteger(this.gap, HEIGHT -
GROUND_HEIGHT - this.gap - this.gap);
 pipe.scored = false;
 }
 }
 }
 drawPipes() {
 fill("#795548");
 for (var pipe of this.pipes_list) {
 rect(pipe.x, 0, this.width, pipe.height);
 rect(pipe.x, HEIGHT - GROUND_HEIGHT, this.width, -HEIGHT +
pipe.height + GROUND_HEIGHT + this.gap);
 }
 }
}
var bird = new Bird(WIDTH / 2, HEIGHT / 2, 30);
var pipes = new Pipes(30, 200, 100);

function draw() {
 background("#87CEEB");
 fill("#69BE16");
 rect(0, HEIGHT - GROUND_HEIGHT, WIDTH, HEIGHT);

 for (let i = 0; i < clouds.length; i++) {
 fill(255);
 noStroke();
 ellipse(clouds[i].x, clouds[i].y - 20,
 clouds[i].w - 10, clouds[i].h)
 ellipse(clouds[i].x + 20, clouds[i].y,
 clouds[i].w, clouds[i].h)
 ellipse(clouds[i].x - 20, clouds[i].y,
 clouds[i].w, clouds[i].h)
 }
 bird.draw();
 bird.update();

 bird.checkDeath(pipes);
 pipes.update();
 pipes.drawPipes();
 fill(255);
 textSize(50);
 textAlign(CENTER, TOP);
 text(SCORE, WIDTH / 2, HEIGHT - HEIGHT / 7);
 // SCROLL_SPEED += 0.01;
}
function keyPressed() {
 if (keyCode == 13) {
 bird.flap();
 }
}
function mouseClicked() {
 bird.flap();
}