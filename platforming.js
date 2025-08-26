import { platformState } from './squirrel.js';

//TODO: fix passable platform ability to fall through when holding down. (renderTileMap function update for theme-switching messed it up)
export function isGrounded(squirrelRect, platforms, jumpDelta) {
  const pxThresholdY = 20;//15;
  const pxThresholdX = 10;

  for (let platform of platforms) {
    if (
      platformState.ignoreGroundedPlatform &&
      platform.element === platformState.ignoreGroundedPlatform.element
    ) { continue; }

    const overTop =
      squirrelRect.bottom >= platform.top &&
      squirrelRect.bottom <= platform.top + pxThresholdY;

    const horizontallyCentered =
      squirrelRect.right - pxThresholdX > platform.left &&
      squirrelRect.left + pxThresholdX < platform.right;

    if (overTop && horizontallyCentered && jumpDelta <= 0) {
      return platform;
    }
  }
  return null;
}

export function checkXCollision(squirrelRect, platforms, direction) {
  for (let platform of platforms) {
    if (!platform.element.classList.contains("passable_platform")) {

      const yCol =
        squirrelRect.bottom > platform.top &&
        squirrelRect.top < platform.bottom;

      if (direction === "right") {
        const rightCol =
          squirrelRect.right > platform.left &&
          squirrelRect.left < platform.left &&
          yCol;
        if (rightCol) {
          return true;
        }
      }

      if (direction === "left") {
        const leftCol =
          squirrelRect.left < platform.right &&
          squirrelRect.right > platform.right &&
          yCol;
        if (leftCol) {
          return true;
        }
      }
    }
  }
}

export function isHeadBump(squirrelRect, platforms, lastY, currentY) {
  const toleranceX = 8;

  for (let platform of platforms) {
    if (!platform.element.classList.contains("passable_platform")) {
      const xCol =
        squirrelRect.right - toleranceX > platform.left &&
        squirrelRect.left + toleranceX < platform.right;
      const crossedTop =
        lastY >= platform.bottom && currentY <= platform.bottom;

      if (xCol && crossedTop) {
        return platform;
      }
    }
  }
  return null;
}
