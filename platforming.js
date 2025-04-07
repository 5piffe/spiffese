export function isGrounded(squirrelRect, platforms) {
  for (let platform of platforms) {
    if (
      squirrelRect.bottom <= platform.bottom &&
      squirrelRect.bottom >= platform.top &&

      squirrelRect.left < platform.right &&
      squirrelRect.right > platform.left) {
      return true;
    }
  }
  return false;
}
