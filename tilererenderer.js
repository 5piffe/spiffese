const container = document.getElementById("world");
const tileSize = 55;
const rows = tileMap.length;

tileMap.forEach((row, y) => {

  row.split("").forEach((tile, x) => {

    if (tile !== "0") {
      const div = document.createElement("div");
      div.style.position = "absolute";
      div.style.width = tileSize + "px";
      div.style.height = tileSize + "px";
      div.style.left = x * tileSize + "px";
      div.style.bottom = y * tileSize + "px";

      div.style.bottom = (rows - 1 - y) * tileSize + "px";

      switch (tile) {
        case "S":
          div.classList.add("stone", "platform");
          break;
        case "W":
          div.classList.add("wood", "platform");
          break;
      }

      container.appendChild(div);
    }
  });
});
