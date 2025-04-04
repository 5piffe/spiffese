const squirrel = document.getElementById("squirrel");
let season = localStorage.getItem('season');

let lastFrameTime = performance.now();
let frameTime = 16.67;

// Move
let facingRight = true;
let squirrelPosition = 0;
let squirrelSpeed = 0;
const acceleration = 0.2;
const maxSpeed = 8;
const friction = 0.3;

// Jump
let isJumping = false;
let jumpDelta = 0;
let currentJumpHeight = 0;
const gravity = 1;
const jumpStrength = 30;
const fallTerminalVelocity = 20;
const glideTerminalVelocity = 3;
const glideBrakeFactor = 0.6;
const jumpBrakeFactor = 0.5;
const minJumpAbortDelta = 10;
const groundLevel = 0;

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
    } else {
      squirrel.style.backgroundImage = facingRight
        ? `url('${GetSquirrelAnimation("IDLE_RIGHT")}')`
        : `url('${GetSquirrelAnimation("IDLE_LEFT")}')`;
    }
  } else {
    squirrel.style.backgroundImage = facingRight
      ? `url('${GetSquirrelAnimation((jumpDelta > 0) ? "JUMP_RIGHT" : "FALL_RIGHT")}')`
      : `url('${GetSquirrelAnimation((jumpDelta > 0) ? "JUMP_LEFT" : "FALL_LEFT")}')`;
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

function moveSquirrel(time) {
  let deltaTime = (time - lastFrameTime) / 16.67;
  lastFrameTime = time;

  if (GetKey(EDirection.RIGHT)) {
    squirrelSpeed = Math.min(squirrelSpeed + acceleration, maxSpeed);
    facingRight = true;
  } else if (GetKey(EDirection.LEFT)) {
    squirrelSpeed = Math.min(squirrelSpeed + acceleration, maxSpeed);
    facingRight = false;
  } else { // Strop-time
    squirrelSpeed = Math.max(0, squirrelSpeed - friction);
  }

  // Init jump
  if (GetKey(EDirection.UP) && !isJumping) {
    isJumping = true;
    jumpDelta = jumpStrength;
  }

  // In Air
  if (isJumping) {
    if (GetKey(EDirection.UP) && jumpDelta < 0) {
      if (jumpDelta < -glideTerminalVelocity) {
        jumpDelta += gravity * glideBrakeFactor * deltaTime;
      } else {
        jumpDelta -= gravity * deltaTime;
      }
    } else {
      jumpDelta -= gravity * deltaTime;
      jumpDelta = Math.max(jumpDelta, -fallTerminalVelocity);
      if (jumpDelta > minJumpAbortDelta && !GetKey(EDirection.UP)) {
        jumpDelta -= jumpDelta * jumpBrakeFactor * deltaTime;
      }
    }
    currentJumpHeight += jumpDelta * deltaTime;

    // On grounded
    if (currentJumpHeight <= groundLevel) {
      isJumping = false;
      currentJumpHeight = groundLevel;
      jumpDelta = 0;
    }
  }

  squirrelPosition += squirrelSpeed * (facingRight ? 1 : -1) * deltaTime;
  squirrel.style.left = squirrelPosition + "px";
  squirrel.style.bottom = currentJumpHeight + "px";
  updateSquirrelAnimation();
  checkBorder();
  requestAnimationFrame(moveSquirrel);
}

requestAnimationFrame(moveSquirrel);
