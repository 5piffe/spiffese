const squirrel = document.getElementById("squirrel");
let lastFrameTime = performance.now();
let frameTime = 16.67;

// Move
let facingRight = true;
let squirrelPosition = 0;
let squirrelSpeed = 0;
const acceleration = 0.2;
const maxSpeed = 8;
const friction = 0.4;
let isXBlocked = false;

// Jump
let isJumping = false;
let jumpDelta = 0;
let currentJumpHeight = 0;
let hasLanded = true;
const gravity = 1;
const jumpStrength = 20;
const fallTerminalVelocity = 20;
const glideTerminalVelocity = 3;
const glideBrakeFactor = 0.5;
const jumpBrakeFactor = 0.5;
const minJumpAbortDelta = 10;
const groundLevel = 0;

import { isGrounded, checkXCollision, isHeadBump } from "./platforming.js";
const platformElements = Array.from(document.querySelectorAll(".platform"));

function getPlatformRects() {
  return platformElements.map(el => {
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
      element: el,
    };
  });

} function getSquirrelColliderBox() {
  const rect = document.getElementById("squirrel").getBoundingClientRect();
  const paddingX = 50;
  const paddingY = 40;

  return {
    top: rect.top + paddingY,
    bottom: rect.bottom,
    left: rect.left + paddingX / 2,
    right: rect.right - paddingX / 2,
  };
}

function update(time) {
  let deltaTime = (time - lastFrameTime) / frameTime;
  deltaTime = Math.min(deltaTime, 0.8);
  lastFrameTime = time;

  moveSquirrel(deltaTime);
  updateSquirrelAnimation();
  checkBorder();

  requestAnimationFrame(update);
}
requestAnimationFrame(update);

function moveSquirrel(deltaTime) {
  const squirrelRect = getSquirrelColliderBox();
  const platformRects = getPlatformRects();
  const groundedPlatform = isGrounded(squirrelRect, platformRects, jumpDelta);
  const direction = facingRight ? "right" : "left";

  isXBlocked = checkXCollision(squirrelRect, platformRects, direction);

  if (GetKey(EDirection.RIGHT)) {
    squirrelSpeed = Math.min(squirrelSpeed + acceleration * deltaTime, maxSpeed);
    facingRight = true;
  } else if (GetKey(EDirection.LEFT)) {
    squirrelSpeed = Math.min(squirrelSpeed + acceleration * deltaTime, maxSpeed);
    facingRight = false;
  } else {
    squirrelSpeed = Math.max(0, squirrelSpeed - friction * deltaTime);
  }

  // Init jump
  if (GetKey(EDirection.UP) && !isJumping && hasLanded) {
    isJumping = true;
    hasLanded = false;
    jumpDelta = jumpStrength;
  }

  // Start fall if !jump
  if (!isJumping && !groundedPlatform && currentJumpHeight > groundLevel) {
    isJumping = true;
    jumpDelta = 0; // Start falling
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

    // Headbump
    if (jumpDelta > 0) {
      const bumpedPlatform = isHeadBump(squirrelRect, platformRects);
      if (bumpedPlatform) {
        isJumping = false;
        jumpDelta = 0;
      }
    }

    // Landing
    if (jumpDelta < 0) {
      if (groundedPlatform) {
        currentJumpHeight = window.innerHeight - groundedPlatform.top;
        isJumping = false;
        hasLanded = true;
        jumpDelta = 0;

      } else if (currentJumpHeight <= groundLevel) {
        currentJumpHeight = groundLevel;
        isJumping = false;
        hasLanded = true;
        jumpDelta = 0;
      }
    }
  }


  if (!isXBlocked) {
    squirrelPosition += squirrelSpeed * (facingRight ? 1 : -1) * deltaTime;
    squirrel.style.left = squirrelPosition + "px";

  }
  squirrel.style.bottom = currentJumpHeight + "px";
}

function updateSquirrelAnimation() {
  if (!isJumping) {
    if (GetKey(EDirection.RIGHT)) {
      facingRight = true;
      squirrel.style.backgroundImage = !checkBorder() /*&& !isXBlocked*/ // fix positioning or anim for this
        ? `url('${GetSquirrelAnimation("RUN_RIGHT")}')`
        : `url('${GetSquirrelAnimation("BLOCKED_RIGHT")}')`;
    } else if (GetKey(EDirection.LEFT)) {
      facingRight = false;
      squirrel.style.backgroundImage = !checkBorder() /*&& !isXBlocked*/
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
