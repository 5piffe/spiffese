const container_walkable = document.getElementById("world_walkable");
const sourceTileSize = 16;
const tileSize = 64;

renderTileMap(tileMap_walkable, container_walkable, tileSize);

function renderTileMap(tileMap, container, tileSize, zIndex = 1) {
  const rows = tileMap.length;
  const scaleFactor = tileSize / sourceTileSize;

  const platformTiles = [];
  const occupiedPos = new Set();

  // Render walkable tiles
  tileMap.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile !== "  ") {
        const def = TILES[tile];
        if (!def) return;

        const pixelX = x * tileSize;
        const pixelY = (rows - 1 - y) * tileSize;

        const div = createTileDiv(def, pixelX, pixelY, tileSize, scaleFactor, zIndex);
        container.appendChild(div);

        const classList = typeof def.classes === "function" ? def.classes() : def.classes;
        if (classList.includes("platform")) {
          platformTiles.push({ x: pixelX, y: pixelY });
        }
        // Private tile-space!
        occupiedPos.add(`${pixelX},${pixelY}`);
      }
    });
  });

  // Add random prop-tiles on top of walkable tiles
  const propTiles = Object.entries(TILES).filter(([, def]) => def.isProp);
  platformTiles.forEach(({ x, y }) => {
    propTiles.forEach(([, def]) => {
      const weight = def.weight ?? 0.5; // 50% if forgot to define weight in tile
      if (Math.random() < weight) {
        const propX = x;
        const propY = y + tileSize;

        if (!occupiedPos.has(`${propX},${propY}`)) {
          const propDiv = createTileDiv(def, propX, propY, tileSize, scaleFactor, zIndex);
          container.appendChild(propDiv);
          occupiedPos.add(`${propX},${propY}`);
        }
      }
    });
  });
}
function createTileDiv(def, x, y, tileSize, scaleFactor) {
  const div = document.createElement("div");
  const scale = def.scale || 1;
  const offsetX = (def.offsetX || 0) * scaleFactor;
  const offsetY = (def.offsetY || 0) * scaleFactor;

  div.style.position = "absolute";
  div.style.width = tileSize * scale + "px";
  div.style.height = tileSize * scale + "px";
  div.style.left = x + offsetX + "px";
  div.style.bottom = y + offsetY + "px";
  div.style.backgroundSize = "contain";
  div.style.backgroundRepeat = "no-repeat";
  const classList = typeof def.classes === "function" ? def.classes() : def.classes;
  classList.forEach(cls => div.classList.add(cls));
  return div;
}

