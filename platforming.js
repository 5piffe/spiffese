export function isGrounded(squirrelRect, platforms, jumpDelta) {
  const pxThresholdY = 15;
  const pxThresholdX = 5;

  for (let platform of platforms) {
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

export function isHeadBump(squirrelRect, platforms, verticalTolerance = 10, horizontalAllowance = 5) {
  for (let platform of platforms) {
    const xCol =
      squirrelRect.right - horizontalAllowance > platform.left &&
      squirrelRect.left + horizontalAllowance < platform.right;

    const yUpCol =
      squirrelRect.top >= platform.bottom &&
      squirrelRect.top - platform.bottom <= verticalTolerance;

    if (xCol && yUpCol) {
      return platform;
    }
  }
  return null;
}
