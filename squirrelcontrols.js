
const EDirection = Object.freeze({
  UP: 'w',
  DOWN: 's',
  LEFT: 'a',
  RIGHT: 'd',
});

const keyState = { w: false, s: false, a: false, d: false };
const touchState = { w: false, s: false, a: false, d: false };

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
    group.appendChild(btn);
  });

  touchControls.appendChild(leftGroup);
  touchControls.appendChild(rightGroup);
  document.body.appendChild(touchControls);

  setupTouchEvents();
}

function setupTouchEvents() {
  let activeKeys = new Set();

  const updateActiveKeys = (e) => {
    e.preventDefault();
    const newActiveKeys = new Set();

    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches[i];
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      if (el && el.classList.contains('touch-button')) {
        const key = el.id.replace('btn-', '');
        newActiveKeys.add(key);
      }
    }

    for (const key in touchState) {
      touchState[key] = false;
    }

    newActiveKeys.forEach(key => {
      if (key in touchState) {
        touchState[key] = true;
      }
    });

    activeKeys = newActiveKeys;
  };

  const clearTouches = () => {
    activeKeys.forEach(key => {
      touchState[key] = false;
    });
    activeKeys.clear();
  };

  const controls = document.getElementById('touch-controls');
  controls.addEventListener('touchstart', updateActiveKeys);
  controls.addEventListener('touchmove', updateActiveKeys);
  controls.addEventListener('touchend', updateActiveKeys);
  controls.addEventListener('touchcancel', clearTouches);

  controls.querySelectorAll('.touch-button').forEach(el => {
    const key = el.id.replace('btn-', '');
    el.addEventListener('mousedown', () => { touchState[key] = true; });
    el.addEventListener('mouseup', () => { touchState[key] = false; });
    el.addEventListener('mouseleave', () => { touchState[key] = false; });
  });
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
