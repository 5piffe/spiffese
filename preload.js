// seasonal weather-effect
const particleContainer = document.createElement("div");
particleContainer.id = "particle-container";
document.body.appendChild(particleContainer);

// main page structure
function appendDiv(id, parent = document.body, className = "") {
  const div = document.createElement("div");
  div.id = id;
  if (className) div.className = className;
  parent.appendChild(div);
  return div;
}

const bodyContainer = appendDiv("body-container");

const header = document.createElement("header");
bodyContainer.appendChild(header);

if (isTouchDevice) {
  document.body.classList.add('touch');
}
const headerContainer = appendDiv("header-container", header);
appendDiv("name", headerContainer).textContent = "Richard Nordström";
appendDiv("header", headerContainer);
appendDiv("subtitle", header);
appendDiv("contact", header).innerHTML = `
  <a href="#" id="email-link">copy email</a>
  <a href="https://www.linkedin.com/in/richard-nordstr%C3%B6m-055055310/" target="_blank" id="linkedin-link">LinkedIn</a>
`;
appendDiv("copy-message", header).textContent = "ctrl+c spiffe84@gmail.com";

appendDiv("tree-container", bodyContainer);
appendDiv("squirrel-container", bodyContainer);
appendDiv("squirrel", document.getElementById("squirrel-container"));
appendDiv("world_walkable", bodyContainer);
appendDiv("world_props_foreground", bodyContainer);

