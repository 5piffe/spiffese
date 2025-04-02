const squirrel = document.getElementById("squirrel");
let facingRight = true;
let squirrelPosition = 0;
let squirrelSpeed = 0;
const acceleration = 0.2;
const maxSpeed = 8;
const friction = 0.5;
let season = localStorage.getItem('season');
let interval;

function updateSquirrelAnimation() {
  if (GetKey(EDirection.RIGHT)) {
    facingRight = true;
    squirrel.style.backgroundImage = !checkBorder()
      ? `url('${GetSquirrelAnimation("RUN_RIGHT")}')`
      : `url('${GetSquirrelAnimation("BLOCKED_RIGHT")}')`;
  } else if (GetKey(EDirection.LEFT)) {
    facingRight = false;
    squirrel.style.backgroundImage = !checkBorder()
      ? `url('${GetSquirrelAnimation("RUN_LEFT")}')`
      : `url('${GetSquirrelAnimation("BLOCKED_LEFT")}')`; // Press edge animation
  } else { // Not trying to move
    if (facingRight) {
      squirrel.style.backgroundImage = `url('${GetSquirrelAnimation("IDLE_RIGHT")}')`;
    } else {
      squirrel.style.backgroundImage = `url('${GetSquirrelAnimation("IDLE_LEFT")}')`;
    }
  }
}

function checkBorder() {
  if (squirrelPosition < 0) {
    squirrelPosition = 0;
    return true;
  } else if ((squirrelPosition + squirrel.offsetWidth) > (window.innerWidth - 200)) {
    squirrelPosition = (window.innerWidth - 200) - squirrel.offsetWidth;
    return true;
  }
  return false;
}

function moveSquirrel() {
  if (GetKey(EDirection.RIGHT)) {
    squirrelSpeed = Math.min(squirrelSpeed + acceleration, maxSpeed);
    facingRight = true;
  } else if (GetKey(EDirection.LEFT)) {
    squirrelSpeed = Math.min(squirrelSpeed + acceleration, maxSpeed);
    facingRight = false;
  } else {
    squirrelSpeed = Math.max(0, squirrelSpeed - friction);
  }

  squirrelPosition += squirrelSpeed * (facingRight ? 1 : -1);
  squirrel.style.left = squirrelPosition + "px";
  updateSquirrelAnimation();
  checkBorder();
}

interval = setInterval(moveSquirrel, 16);
