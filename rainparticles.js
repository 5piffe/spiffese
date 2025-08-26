const seasonalParticles = {
  winter: {
    images: [
      "url('sprites/weatherparticles/snowflake_large.gif')",
      "url('sprites/weatherparticles/snowflake_smol.gif')",
    ],
    minSpeed: 10,
    maxSpeed: 100,
    minScale: 0.1,
    maxScale: 0.6,
    minRotationSpeed: 0.3,
    maxRotationSpeed: 1.5,
    minOpacity: 0.2,
    maxOpacity: 0.7,
    minLifetime: 5,
    maxLifetime: 20,
    creationfrequency: 500,
  },
  spring: {
    image: "url('sprites/weatherparticles/raindrop.gif')",
    minSpeed: 1000,
    maxSpeed: 5000,
    minScale: 0.1,
    maxScale: 0.52,
    minRotationSpeed: 0,
    maxRotationSpeed: 0,
    minOpacity: 0.3,
    maxOpacity: 0.9,
    minLifetime: 0.5,
    maxLifetime: 3,
    creationfrequency: 50,
  },
  summer: {
    images: [
      "url('sprites/weatherparticles/pollenstuff.gif')",
      "url('sprites/weatherparticles/pollenstuff2.gif')",
      "url('sprites/weatherparticles/pollenstuff3.gif')",
    ],
    minSpeed: 5,
    maxSpeed: 50,
    minScale: 0.1,
    maxScale: 0.6,
    minRotationSpeed: 0.4,
    maxRotationSpeed: 0.8,
    minOpacity: 0.1,
    maxOpacity: 0.8,
    minLifetime: 5,
    maxLifetime: 30,
    creationfrequency: 1500,
  },
  autumn: {
    images: [
      "url('sprites/weatherparticles/leaf12.gif')",
      "url('sprites/weatherparticles/leaf2_sml.gif')",
      "url('sprites/weatherparticles/leaf1_sml.gif')",
    ],
    minSpeed: 8,
    maxSpeed: 70,
    minScale: 0.1,
    maxScale: 0.6,
    minRotationSpeed: 0.1,
    maxRotationSpeed: 1,
    minOpacity: 0.6,
    maxOpacity: 1,
    minLifetime: 5,
    maxLifetime: 20,
    creationfrequency: 75,
  },

  /* Festive particles */
  halloween: {
    image: "url('sprites/weatherparticles/blood_drop1.gif')",
    minSpeed: 800,
    maxSpeed: 3000,
    minScale: 0.2,
    maxScale: 0.82,
    minRotationSpeed: 0,
    maxRotationSpeed: 0,
    minOpacity: 0.2,
    maxOpacity: 0.5,
    minLifetime: 0.5,
    maxLifetime: 3,
    creationfrequency: 50,
  },
};

const MAX_PARTICLES = 30;
const container = document.getElementById("particle-container");

function createParticle(/*season*/) {
  if (container.childElementCount >= MAX_PARTICLES) return;

  const season = localStorage.getItem("season") || "spring";
  const settings = seasonalParticles[season] || seasonalParticles["spring"];

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
  const images = settings.images || [settings.image];
  p.style.backgroundImage = images[Math.floor(Math.random() * images.length)];
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

  const lifetime = settings.minLifetime + Math.random() * (settings.maxLifetime - settings.minLifetime);

  setTimeout(() => {
    p.style.transform += " scale(0)";
    p.style.opacity = "0";

    setTimeout(() => p.remove(), 500);
  }, lifetime * 1000);

  requestAnimationFrame(fall);
}

let particleTimer;

function startParticles() {
  clearInterval(particleTimer);

  const season = localStorage.getItem("season") || "spring";
  const settings = seasonalParticles[season] || seasonalParticles["winter"];

  particleTimer = setInterval(createParticle, settings.creationfrequency);
}

startParticles();

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    clearInterval(particleTimer);
  } else {
    startParticles();
  }
});
