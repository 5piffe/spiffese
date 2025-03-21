const squirrel = document.getElementById("squirrel");
let facingRight = true;
let squirrelPosition = 0;
let squirrelSpeed = 0;
const acceleration = 0.2;
const maxSpeed = 8;
const friction = 0.5;

let interval;

// Movement states
let isMovingLeft = false;
let isMovingRight = false;

function toggleSquirrelDirection() {
    if (facingRight) {
        squirrel.style.backgroundImage = "url('images/squirrel/squirrel_idle_right_20x20.gif')";
    } else {
        squirrel.style.backgroundImage = "url('images/squirrel/squirrel_idle_left_20x20.gif')";
    }
}

function updateSquirrelAnimation() {
    if (isMovingRight) {
        squirrel.style.backgroundImage = "url('images/squirrel/squirrel_run_right.gif')";
        facingRight = true;
    } else if (isMovingLeft) {
        squirrel.style.backgroundImage = "url('images/squirrel/squirrel_run_left.gif')";
        facingRight = false;
    } else {
        if (facingRight) {
            squirrel.style.backgroundImage = "url('images/squirrel/squirrel_idle_right_20x20.gif')";
        } else {
            squirrel.style.backgroundImage = "url('images/squirrel/squirrel_idle_left_20x20.gif')";
        }
    }
}

function moveSquirrel() {    if (isMovingRight) {
        squirrelSpeed = Math.min(squirrelSpeed + acceleration, maxSpeed);
        facingRight = true;
    } else if (isMovingLeft) {
        squirrelSpeed = Math.min(squirrelSpeed + acceleration, maxSpeed);
        facingRight = false;
    } else {
        squirrelSpeed = Math.max(0, squirrelSpeed - friction);
    }

    squirrelPosition += squirrelSpeed * (facingRight ? 1 : -1);
    squirrel.style.left = squirrelPosition + "px";
    updateSquirrelAnimation();

   }

function handleKeyDown(event) {
    if (event.key === "ArrowRight") {
        isMovingRight = true;
        isMovingLeft = false;
    } else if (event.key === "ArrowLeft") {
        isMovingLeft = true;
        isMovingRight = false;
        }
}

function handleKeyUp(event) {
    if (event.key === "ArrowRight") {
        isMovingRight = false;
    } else if (event.key === "ArrowLeft") {
        isMovingLeft = false;
    }
}

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
interval = setInterval(moveSquirrel, 16); //~60fps
