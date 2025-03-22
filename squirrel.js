const squirrel = document.getElementById("squirrel");
let facingRight = true;
let squirrelPosition = 0;
let squirrelSpeed = 0;
const acceleration = 0.2;
const maxSpeed = 8;
const friction = 0.5;
let season = localStorage.getItem('season');
let interval;

// Movement states
let isMovingLeft = false;
let isMovingRight = false;

function updateSquirrelAnimation()
{
    if (isMovingRight)
    {
        facingRight = true;
        if (season === 'spring')
        {
            squirrel.style.backgroundImage = "url('animations/squirrel/spring/squirrel_runright_spring.gif')";
        }
        else
        {
            squirrel.style.backgroundImage = "url('animations/squirrel/base/squirrel_runright_base.gif')";
        }
    }
    else if (isMovingLeft)
    {
        facingRight = false;
        if (season === 'spring')
        {
            squirrel.style.backgroundImage = "url('animations/squirrel/spring/squirrel_runleft_spring.gif')";
        }
        else
        {
            squirrel.style.backgroundImage = "url('animations/squirrel/base/squirrel_runleft_base.gif";
        }
        
    }
    else
    {
        if (facingRight)
        {
            if (season === 'spring')
            {
                squirrel.style.backgroundImage = "url('animations/squirrel/spring/squirrel_idleright_spring.gif')";
            }
            else
            {
                squirrel.style.backgroundImage = "url('animations/squirrel/base/squirrel_idleright_base.gif')";
            }
        }
        else
        {
            if (season === 'spring')
            {
                squirrel.style.backgroundImage = "url('animations/squirrel/spring/squirrel_idleleft_spring.gif')";
            }
            else
            {
                squirrel.style.backgroundImage = "url('animations/squirrel/base/squirrel_idleleft_base.gif')";
            }
        }
    }
}

function moveSquirrel()
{
    if (isMovingRight)
    {
        squirrelSpeed = Math.min(squirrelSpeed + acceleration, maxSpeed);
        facingRight = true;
    }
    else if (isMovingLeft)
    {
        squirrelSpeed = Math.min(squirrelSpeed + acceleration, maxSpeed);
        facingRight = false;
    }
    else
    {
        squirrelSpeed = Math.max(0, squirrelSpeed - friction);
    }

    squirrelPosition += squirrelSpeed * (facingRight ? 1 : -1);
    squirrel.style.left = squirrelPosition + "px";
    updateSquirrelAnimation();
}

function handleKeyDown(event)
{
    if (event.key === "ArrowRight")
    {
        isMovingRight = true;
        isMovingLeft = false;
    }
    else if (event.key === "ArrowLeft")
    {
        isMovingLeft = true;
        isMovingRight = false;
    }
}

function handleKeyUp(event)
{
    if (event.key === "ArrowRight")
    {
        isMovingRight = false;
    }
    else if (event.key === "ArrowLeft")
    {
        isMovingLeft = false;
    }
}

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
interval = setInterval(moveSquirrel, 16); //~60fps
