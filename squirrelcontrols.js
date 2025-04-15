const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

const EDirection = Object.freeze({
  UP: 'w',
  DOWN: 's',
  LEFT: 'a',
  RIGHT: 'd',
});

const keyState = { w: false, s: false, a: false, d: false };
const touchState = { w: false, s: false, a: false, d: false };

function setupTouchControls() {
  const touchControls = document.createElement('div');
  touchControls.id = 'touch-controls';

  const keys = ['a', 'd', 's', 'w'];
  keys.forEach(key => {
    const btn = document.createElement('div');
    btn.className = 'touch-button';
    btn.id = `btn-${key}`;
    touchControls.appendChild(btn);
  });

  document.body.appendChild(touchControls);
  setupTouchEvents();
}

function setupTouchEvents() {
  let activeKeys = new Set();

  const updateActiveTouches = (event) => {
    event.preventDefault();
    const newKeys = new Set();

    for (let i = 0; i < event.touches.length; i++) {
      const touch = event.touches[i];
      const el = document.elementFromPoint(touch.clientX, touch.clientY);

      if (el && el.classList.contains('touch-button')) {
        const key = el.id.replace('btn-', '');
        newKeys.add(key);
        touchState[key] = true;
      }
    }

    activeKeys.forEach(key => {
      if (!newKeys.has(key)) {
        touchState[key] = false;
      }
    });

    activeKeys = newKeys;
  };

  const clearAllTouches = () => {
    activeKeys.forEach(key => touchState[key] = false);
    activeKeys.clear();
  };

  const container = document.getElementById('touch-controls');
  container.addEventListener('touchstart', updateActiveTouches, { passive: false });
  container.addEventListener('touchmove', updateActiveTouches, { passive: false });
  container.addEventListener('touchend', updateActiveTouches);
  container.addEventListener('touchcancel', clearAllTouches);
}

document.addEventListener('DOMContentLoaded', () => {
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

