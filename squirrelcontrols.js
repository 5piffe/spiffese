const EDirection = Object.freeze({
  UP: 'w',
  DOWN: 's',
  LEFT: 'a',
  RIGHT: 'd',
});

const keyState = {
  w: false,
  s: false,
  a: false,
  d: false
};

const touchState = {
  w: false,
  s: false,
  a: false,
  d: false
};

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;


function setupTouchControls() {
  const touchControls = document.createElement('div');
  touchControls.id = 'touch-controls';

  const leftGroup = document.createElement('div');
  leftGroup.className = 'touch-group';

  const rightGroup = document.createElement('div');
  rightGroup.className = 'touch-group';

  const buttonMap = {
    a: leftGroup,
    d: leftGroup,
    s: rightGroup,
    w: rightGroup
  };

  Object.entries(buttonMap).forEach(([key, group]) => {
    const btn = document.createElement('div');
    btn.className = 'touch-button';
    btn.id = `btn-${key}`;

    const start = () => touchState[key] = true;
    const end = () => touchState[key] = false;

    btn.addEventListener('touchstart', start);
    btn.addEventListener('touchend', end);
    btn.addEventListener('mousedown', start);
    btn.addEventListener('mouseup', end);
    btn.addEventListener('mouseleave', end);

    group.appendChild(btn);
  });

  touchControls.appendChild(leftGroup);
  touchControls.appendChild(rightGroup);
  document.body.appendChild(touchControls);
}

window.addEventListener('DOMContentLoaded', () => {
  if (isTouchDevice) {
    setupTouchControls();
  }
});

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
  return keyState[direction] || touchState[direction];
}
