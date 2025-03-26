const squirrel = document.getElementById("squirrel");
let facingRight = true;
let squirrelPosition = 0;
let squirrelSpeed = 0;
const acceleration = 0.2;
const maxSpeed = 8;
const friction = 0.5;
let season = localStorage.getItem('season');
let interval;

function updateSquirrelAnimation() {
  if (GetKey(EDirection.RIGHT)) {
    facingRight = true;
    if (season === 'spring') { // Just to test season for now
      squirrel.style.backgroundImage = "url('animations/squirrel/spring/squirrel_runright_spring.gif')";
    } else {
      squirrel.style.backgroundImage = "url('animations/squirrel/base/squirrel_runright_base.gif')";
    }
  }
  else if (GetKey(EDirection.LEFT)) {
    facingRight = false;
    if (season === 'spring') {
      squirrel.style.backgroundImage = "url('animations/squirrel/spring/squirrel_runleft_spring.gif')";
    } else {
      squirrel.style.backgroundImage = "url('animations/squirrel/base/squirrel_runleft_base.gif";
    }

  } else { // Not moving ...
    if (facingRight) {
      if (season === 'spring') {
        squirrel.style.backgroundImage = "url('animations/squirrel/spring/squirrel_idleright_spring.gif')";
      } else {
        squirrel.style.backgroundImage = "url('animations/squirrel/base/squirrel_idleright_base.gif')";
      }
    } else {
      if (season === 'spring') {
        squirrel.style.backgroundImage = "url('animations/squirrel/spring/squirrel_idleleft_spring.gif')";
      } else {
        squirrel.style.backgroundImage = "url('animations/squirrel/base/squirrel_idleleft_base.gif')";
      }
    }
  }
}

function moveSquirrel() {
  if (GetKey(EDirection.RIGHT)) {
    squirrelSpeed = Math.min(squirrelSpeed + acceleration, maxSpeed);
    facingRight = true;
  } else if (GetKey(EDirection.LEFT)) {
    squirrelSpeed = Math.min(squirrelSpeed + acceleration, maxSpeed);
    facingRight = false;
  } else {
    squirrelSpeed = Math.max(0, squirrelSpeed - friction);
  }

  squirrelPosition += squirrelSpeed * (facingRight ? 1 : -1);
  squirrel.style.left = squirrelPosition + "px";
  updateSquirrelAnimation();
}

interval = setInterval(moveSquirrel, 16);
