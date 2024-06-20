let canvas = document.querySelector("#game");
let ctx = canvas.getContext("2d");
let bird = new Image();
let bg = new Image();
let ground = new Image();
let pipeBottom = new Image();
let pipeUp = new Image();
bird.src = "img/bird.png";
bg.src = "img/bg.png";
ground.src = "img/ground.png";
pipeBottom.src = "img/pipeBottom.png";
pipeUp.src = "img/pipeUp.png";
let jump = new Audio();
jump.src = "jump.mp3";
let gameOversound = new Audio();
gameOversound.src = "gameover.mp3";
let xpos = 10;
let ypos = 150;
let grav = 1.5;
let jumppower = 40;
let score = 0;
let gap = 111;
let pipes = [];
let gameOver = false;
pipes[0] = {
  x: canvas.width,
  y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
};
function draw() {
  ctx.drawImage(bg, 0, 0);
  for (pipe of pipes) {
    ctx.drawImage(pipeUp, pipe.x, pipe.y);
    ctx.drawImage(pipeBottom, pipe.x, pipe.y + pipeUp.height + gap);
    pipe.x--;
    if (pipe.x == 125) {
    }

    if (
      (((xpos >= pipe.x && xpos <= pipe.x + pipeUp.width) ||
        (xpos + bird.width >= pipe.x &&
          xpos + bird.width <= pipe.x + pipeUp.width)) &&
        (ypos <= pipe.y + pipeUp.height ||
          ypos + bird.height >= pipe.y + pipeUp.height + gap)) ||
      ypos + bird.height >= canvas.height - ground.height
    ) {
      gameOver = true;
    }

    if (pipe.x == 5) {
      score++;
    }
  }
  pipes = pipes.filter((pipe) => pipe.x > -200);
  ctx.drawImage(ground, 0, canvas.height - ground.height);

  ctx.drawImage(bird, xpos, ypos);

  ypos += grav;

  ctx.fillStyle = "black";
  ctx.font = "24px sans-serif";
  ctx.fillText(`счёт: ${score}`, 10, 50);
  if (gameOver) {
    pipes = [];
    xpos = 10;
    ypos = 150;
    score = 0;
    gameOver = false;
    gameOversound.play();
  }
  requestAnimationFrame(draw);
}
function keypressaction(e) {
  e.preventDefault();
  console.log(e);
  if (e.code == "Space" || e.type == "click") {
    ypos -= jumppower;
    jump.play();
  }
}
let timer = setInterval(() => {
  pipes.push({
    x: canvas.width,
    y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
  });
}, 2500);
document.addEventListener("keydown", keypressaction);
document.addEventListener("click", keypressaction);
document.addEventListener("ontouchstart", keypressaction);
draw();
