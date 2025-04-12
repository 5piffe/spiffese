const squirrel = document.getElementById("squirrel");
let lastFrameTime = performance.now();
let accumulatedTime = 0;
const fixedDelta = 1 / 60;

// Move
let facingRight = true;
let squirrelPosition = 0;
let squirrelSpeed = 0;
const acceleration = 2000;
const maxSpeed = 400;
const friction = 3000;
let isXBlocked = false;

// Jump
let isJumping = false;
let jumpDelta = 0;
let currentJumpHeight = 0;
let hasLanded = true;
const gravity = 2800;
const jumpStrength = 900;
const fallTerminalVelocity = 1200;
const glideTerminalVelocity = 200;
const glideBrakeFactor = 0.6;
const jumpBrakeFactor = 15;
const minJumpAbortDelta = 350;
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
}

function getSquirrelColliderBox(yOffset = currentJumpHeight) {
  const rect = squirrel.getBoundingClientRect();
  const paddingX = 20;
  const paddingTop = 33;

  const spriteTop = window.innerHeight - (yOffset + squirrel.offsetHeight);

  return {
    top: spriteTop + paddingTop,
    bottom: spriteTop + squirrel.offsetHeight,
    left: rect.left + paddingX,
    right: rect.right - paddingX,
  };
}

function update(currentTime) {
  const deltaTime = (currentTime - lastFrameTime) / 1000;
  lastFrameTime = currentTime;
  accumulatedTime += deltaTime;

  while (accumulatedTime >= fixedDelta) {
    physicsUpdate(fixedDelta);
    accumulatedTime -= fixedDelta;
  }
  updateSquirrelAnimation();
  checkBorder();

  requestAnimationFrame(update);
}
requestAnimationFrame(update);

function physicsUpdate(fixedDelta) {
  moveSquirrel(fixedDelta);
}

function moveSquirrel(fixedDeltaTime) {
  const squirrelRect = getSquirrelColliderBox();
  const platformRects = getPlatformRects();
  const groundedPlatform = isGrounded(squirrelRect, platformRects, jumpDelta);
  const direction = facingRight ? "right" : "left";

  isXBlocked = checkXCollision(squirrelRect, platformRects, direction);

  if (GetKey(EDirection.RIGHT)) {
    squirrelSpeed = Math.min(squirrelSpeed + acceleration * fixedDeltaTime, maxSpeed);
    facingRight = true;
  } else if (GetKey(EDirection.LEFT)) {
    squirrelSpeed = Math.min(squirrelSpeed + acceleration * fixedDeltaTime, maxSpeed);
    facingRight = false;
  } else {
    squirrelSpeed = Math.max(0, squirrelSpeed - friction * fixedDeltaTime);
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
    jumpDelta = 0;
  }

  // In Air
  if (isJumping) {
    if (GetKey(EDirection.UP) && jumpDelta < 0) {
      if (jumpDelta < -glideTerminalVelocity) {
        jumpDelta += gravity * glideBrakeFactor * fixedDeltaTime;
      } else {
        jumpDelta -= gravity * fixedDeltaTime;
      }
    } else {
      jumpDelta -= gravity * fixedDeltaTime;
      jumpDelta = Math.max(jumpDelta, -fallTerminalVelocity);
      if (jumpDelta > minJumpAbortDelta && !GetKey(EDirection.UP)) {
        jumpDelta -= jumpDelta * jumpBrakeFactor * fixedDeltaTime;
      }
    }

    const lastBox = getSquirrelColliderBox(currentJumpHeight);
    currentJumpHeight += jumpDelta * fixedDeltaTime;
    const currentBox = getSquirrelColliderBox(currentJumpHeight);

    const lastTop = lastBox.top;
    const currentTop = currentBox.top;

    if (jumpDelta > 0) {
      const bumpedPlatform = isHeadBump(getSquirrelColliderBox(), getPlatformRects(), lastTop, currentTop);
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
    squirrelPosition += squirrelSpeed * (facingRight ? 1 : -1) * fixedDeltaTime;
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
