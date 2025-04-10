const container_walkable = document.getElementById("world_walkable");
const container_props_foreground = document.getElementById("world_props_foreground");
const container_prope_background = document.getElementById("world_props_background");

const sourceTileSize = 16;
const tileSize = 64;

renderTileMap(tileMap_walkable, container_walkable, tileSize, 2);
renderTileMap(tileMap_props_foreground, container_props_foreground, tileSize, 3);
renderTileMap(tileMap_props_background, container_prope_background, tileSize, 3);

function renderTileMap(tileMap, container, tileSize, zIndex = 1) {
  const rows = tileMap.length;

  tileMap.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile !== "  ") {

        // pixels * scaleFactor for offset to maintain dpi
        const scaleFactor = tileSize / sourceTileSize;
        const tileOffsets = {
          "Gr": { x: 0, y: -4 * scaleFactor },
        };

        const offset = tileOffsets[tile] || { x: 0, y: 0 };
        const pixelX = x * tileSize + offset.x;
        const pixelY = (rows - 1 - y) * tileSize + offset.y; // flip vertically


        const div = document.createElement("div");
        div.style.position = "absolute";
        div.style.width = tileSize + "px";
        div.style.height = tileSize + "px";
        div.style.left = pixelX + "px";
        div.style.bottom = pixelY + "px";
        div.style.backgroundSize = "contain";
        div.style.backgroundRepeat = "no-repeat";
        div.style.zIndex = zIndex;

        // Tile definitions
        switch (tile) {
          /* :: BRICKLAND :: */
          case "Bt":
            div.classList.add("brick_blue_topleft_corner", "platform");
            break;
          case "BT":
            div.classList.add("brick_blue_topleft_edge", "platform");
            break;
          case "Bm":
            const platformVariations = ["brick_blue_topmid", "brick_blue_topmid2"];
            const randomPlatformClass = platformVariations[Math.floor(Math.random() * platformVariations.length)];
            div.classList.add(randomPlatformClass, "platform");
            break;
          case "Br":
            div.classList.add("brick_blue_topright_corner", "platform");
            break;
          case "BR":
            div.classList.add("brick_blue_topright_edge", "platform");
            break;

          /* :: WOODEN BOX STUFF :: */
          case "Wh":
            div.classList.add("wooden_box_horizontal", "platform");
            break;
          case "Wv":
            div.classList.add("wooden_box_vertical", "platform");
            break;

          /* :: PROPS :: */
          case "Bw":
            div.classList.add("bottle_wine");
            break;
          case "Gr":
            const propVariations = ["grass1", "grass2"];
            const randomPropClass = propVariations[Math.floor(Math.random() * propVariations.length)];
            div.classList.add(randomPropClass);
            break;
          case "GR":
            div.classList.add("grass2");
            break;
        }

        container.appendChild(div);
      }
    });
  });
}
