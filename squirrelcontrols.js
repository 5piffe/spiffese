const EDirection = Object.freeze({
  UP: 'w',
  DOWN: 's',
  LEFT: 'a',
  RIGHT: 'd',
});

const keyState = {
  [EDirection.UP]: false,
  [EDirection.DOWN]: false,
  [EDirection.LEFT]: false,
  [EDirection.RIGHT]: false,
};

document.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  if (key in keyState) {
    keyState[key] = true;
  }
});

document.addEventListener('keyup', (event) => {
  const key = event.key.toLowerCase();
  if (key in keyState) {
    keyState[key] = false;
  }
});

function GetKey(direction) {
  return keyState[direction] || false;
}

function GetDirection(direction) {
  return EDirection[direction];
}
