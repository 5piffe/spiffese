const seasonalParticles = {
  winter: {
    image: "url('sprites/weatherparticles/raindrop.gif')",
    minSpeed: 1000,
    maxSpeed: 5000,
    minScale: .1,
    maxScale: .52,
    minRotationSpeed: 0,
    maxRotationSpeed: 0,
    minOpacity: 0.6,
    maxOpacity: 1,
    time: 150,
  },
};

const MAX_PARTICLES = 300;
const container = document.getElementById("particle-container");
const season = "winter";
const settings = seasonalParticles[season];

// Create rainthing
function createParticle(season) {
  if (container.childElementCount >= MAX_PARTICLES) return;

  const settings = seasonalParticles[season] || seasonalParticles["winter"];
  const p = document.createElement("div");
  p.classList.add("particle");

  const scale = settings.minScale + Math.random() * (settings.maxScale - settings.minScale);
  const speed = settings.minSpeed + Math.random() * (settings.maxSpeed - settings.minSpeed);
  const rotationSpeed = settings.minRotationSpeed + Math.random() * (settings.maxRotationSpeed - settings.minRotationSpeed);
  const opacity = settings.minOpacity + Math.random() * (settings.maxOpacity - settings.minOpacity);
  let rotation = 0;

  p.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
  p.style.left = `${Math.random() * window.innerWidth}px`;
  p.style.top = `${-20 + Math.random() * 40}px`;
  p.style.backgroundImage = settings.image;
  p.style.opacity = opacity;

  container.appendChild(p);

  let y = parseFloat(p.style.top) || 0;
  let lastTime = performance.now();

  function fall(currentTime) {
    const delta = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    y += speed * delta;
    rotation += rotationSpeed;

    p.style.top = `${y}px`;
    p.style.transform = `scale(${scale}) rotate(${rotation}deg)`;

    if (y > window.innerHeight) {
      p.remove();
    } else {
      requestAnimationFrame(fall);
    }
  }

  requestAnimationFrame(fall);
}

let particleTimer = setInterval(() => createParticle(season), settings.time);

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    clearInterval(particleTimer);
  } else {
    particleTimer = setInterval(() => createParticle(season), settings.time);
  }
});

