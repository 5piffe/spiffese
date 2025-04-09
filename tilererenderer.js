const container = document.getElementById("world");
const tileSize = 64; // source should be 16x16
const rows = tileMap.length;

// TODO: Procedurally pick tiles depending on geometry instead of specifying for example 'Brick top left'.
tileMap.forEach((row, y) => {

  row.forEach((tile, x) => {

    if (tile !== "  ") {
      const div = document.createElement("div");
      div.style.position = "absolute";
      div.style.backgroundSize = "contain";
      div.style.backgroundRepeat = "no-repeat";
      div.style.width = tileSize + "px";
      div.style.height = tileSize + "px";
      div.style.left = x * tileSize + "px";
      div.style.bottom = y * tileSize + "px";

      div.style.bottom = (rows - 1 - y) * tileSize + "px"; // Flip tilemap

      switch (tile) {
        /* :: BRICKLAND ::*/
        case "Bt":
          div.classList.add("brick_blue_topleft_corner", "platform");
          break;
        case "BT":
          div.classList.add("brick_blue_topleft_edge", "platform");
          break;
        case "Bm":
          const options = ["brick_blue_topmid", "brick_blue_topmid2"];
          const randomClass = options[Math.floor(Math.random() * options.length)];
          div.classList.add(randomClass, "platform");
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
      }

      container.appendChild(div);
    }
  });
});
