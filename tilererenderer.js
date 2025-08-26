const container_walkable = document.getElementById("world_walkable");
const container_foreground = document.getElementById("world_props_foreground");
const sourceTileSize = 16;
const tileSize = 64;

renderTileMap(tileMap_walkable, tileSize);

function renderTileMap(tileMap, tileSize, season) {
  const rows = tileMap.length;
  const scaleFactor = tileSize / sourceTileSize;

  const platformTiles = [];
  const occupiedPos = new Set();

  // Clear previous props
  document.querySelectorAll("#world_props_foreground [data-is-prop='true']").forEach(el => el.remove());
  document.querySelectorAll("#world_walkable [data-is-prop='true']").forEach(el => el.remove());

  // walkable
  tileMap.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile !== "  ") {
        const def = TILES[tile];
        if (!def) return;

        const pixelX = x * tileSize;
        const pixelY = (rows - 1 - y) * tileSize;

        const div = createTileDiv(def, pixelX, pixelY, scaleFactor, season);
        const container = def.isForeGround ? container_foreground : container_walkable;
        container.appendChild(div);

        const classList = typeof def.classes === "function" ? def.classes(season) : def.classes;
        if (classList.includes("platform") || classList.includes("passable_platform")) {
          platformTiles.push({ x: pixelX, y: pixelY });
        }
        occupiedPos.add(`${pixelX},${pixelY}`);
      }
    });
  });

  // Random prop decorations on walkable stuff
  const propTiles = Object.entries(TILES).filter(([, def]) => def.isProp);
  platformTiles.forEach(({ x, y }) => {
    propTiles.forEach(([, def]) => {
      const weight = def.weight ?? 0.5;
      if (Math.random() < weight) {
        const propX = x;
        const propY = y + tileSize;

        if (!occupiedPos.has(`${propX},${propY}`)) {
          const propDiv = createTileDiv(def, propX, propY, scaleFactor, season);
          const propContainer = def.isForeGround ? container_foreground : container_walkable;
          propContainer.appendChild(propDiv);
          occupiedPos.add(`${propX},${propY}`);
        }
      }
    });
  });
}

function createTileDiv(def, x, y, scaleFactor, season) {
  const div = document.createElement("div");
  const scale = def.scale || 1;
  const offsetX = (def.offsetX || 0) * scaleFactor;
  const offsetY = (def.offsetY || 0) * scaleFactor;

  const tileWidth = (def.tileWidth || sourceTileSize) * scaleFactor * scale;
  const tileHeight = (def.tileHeight || sourceTileSize) * scaleFactor * scale;

  div.style.position = "absolute";
  div.style.width = tileWidth + "px";
  div.style.height = tileHeight + "px";
  div.style.left = x + offsetX + "px";
  div.style.bottom = y + offsetY + "px";
  div.style.backgroundSize = "contain";
  div.style.backgroundRepeat = "no-repeat";

  const classList = typeof def.classes === "function" ? def.classes(season) : def.classes;
  classList.forEach(cls => div.classList.add(cls));

  if (def.isProp) div.dataset.isProp = "true";

  return div;
}

