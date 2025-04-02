const squirrel = document.getElementById("squirrel");

let facingRight = true;
let squirrelPosition = 0;
let squirrelSpeed = 0;
const acceleration = 0.2;
const maxSpeed = 8;
const friction = 0.3;

let isJumping = false;
let squirrelYvalue = 0;
let jumpVelocity = 0;
const gravity = 0.6;
const jumpStrength = 16;
const maxJumpHeight = 250;
const minGroundLevel = 0;

let season = localStorage.getItem('season');
let interval;

function updateSquirrelAnimation() {
  if (!isJumping) {
    if (GetKey(EDirection.RIGHT)) {
      facingRight = true;
      squirrel.style.backgroundImage = !checkBorder()
        ? `url('${GetSquirrelAnimation("RUN_RIGHT")}')`
        : `url('${GetSquirrelAnimation("BLOCKED_RIGHT")}')`;
    } else if (GetKey(EDirection.LEFT)) {
      facingRight = false;
      squirrel.style.backgroundImage = !checkBorder()
        ? `url('${GetSquirrelAnimation("RUN_LEFT")}')`
        : `url('${GetSquirrelAnimation("BLOCKED_LEFT")}')`;
    } else { // Not moving or trying to move
      if (facingRight) {
        squirrel.style.backgroundImage = `url('${GetSquirrelAnimation("IDLE_RIGHT")}')`;
      } else {
        squirrel.style.backgroundImage = `url('${GetSquirrelAnimation("IDLE_LEFT")}')`;
      }
    }
  } else {
    if (facingRight) {
      squirrel.style.backgroundImage = `url('${GetSquirrelAnimation((jumpVelocity > 0) ? "JUMP_RIGHT" : "FALL_RIGHT")}')`;
    } else {
      squirrel.style.backgroundImage = `url('${GetSquirrelAnimation((jumpVelocity > 0) ? "JUMP_LEFT" : "FALL_LEFT")}')`;
    }
  }
}

function checkBorder() {
  if (squirrelPosition < 2) {
    squirrelPosition = 2;
    return true;
  } else if ((squirrelPosition + squirrel.offsetWidth) > (window.innerWidth - 22)) {
    squirrelPosition = (window.innerWidth - 22) - squirrel.offsetWidth;
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

  // jump
  if (GetKey(EDirection.UP) && !isJumping) {
    isJumping = (squirrelYvalue <= maxJumpHeight);
    jumpVelocity = jumpStrength;
  } else if (!GetKey(EDirection.UP)) {
    jumpVelocity -= gravity;
  }

  if (isJumping) {
    squirrelYvalue += jumpVelocity;
    jumpVelocity -= gravity;

    if (squirrelYvalue <= minGroundLevel) {
      isJumping = false;
      squirrelYvalue = minGroundLevel;
      jumpVelocity = 0;
    }
  }

  squirrelPosition += squirrelSpeed * (facingRight ? 1 : -1);
  squirrel.style.left = squirrelPosition + "px";
  squirrel.style.bottom = squirrelYvalue + "px";
  updateSquirrelAnimation();
  checkBorder();
}

interval = setInterval(moveSquirrel, 16);
