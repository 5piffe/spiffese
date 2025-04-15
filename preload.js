// Preload gifs
Object.values(squirrelAnimations).forEach(season => {
  Object.values(season).forEach(src => {
    const img = new Image();
    img.src = src;
  });
});


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
  console.log("added touch classname");
  document.body.classList.add('touch');
}
const headerContainer = appendDiv("header-container", header);
appendDiv("name", headerContainer).textContent = "Richard Nordström";
appendDiv("header", headerContainer); // h1, up to you if you want to create it as an h1 element instead
appendDiv("subtitle", header);
appendDiv("contact", header).innerHTML = `<a href="#" id="email-link">copy mail</a>`;
appendDiv("copy-message", header).textContent = "ctrl+c spiffe84@gmail.com";

appendDiv("tree-container", bodyContainer);
appendDiv("squirrel-container", bodyContainer);
appendDiv("squirrel", document.getElementById("squirrel-container"));
appendDiv("world_walkable", bodyContainer);
appendDiv("world_props_foreground", bodyContainer);

