
const TILES = {
  /* :: BRICKLAND :: */
  // waklable
  "Bt": { classes: ["brick_blue_topleft_corner", "platform"] },
  "BT": { classes: ["brick_blue_topleft_edge", "platform"] },
  "Bm": {
    get classes() {
      const variations = ["brick_blue_topmid", "brick_blue_topmid2"];
      return [variations[Math.floor(Math.random() * variations.length)], "platform"];
    }
  },
  "Br": { classes: ["brick_blue_topright_corner", "platform"] },
  "BR": { classes: ["brick_blue_topright_edge", "platform"] },

  /* :: WOODEN STUFF :: */
  // waklable
  "Wh": { classes: ["wooden_box_horizontal", "platform"] },
  "Wv": { classes: ["wooden_box_vertical", "platform"] },
  "WV": {
    classes: ["wooden_box_big32_vertical", "platform"],
    scale: 2
  },
  // decorations
  "Wb": {
    classes: ["wooden_box_background_horizontal"],
    isProp: true,
    weight: 0.3
  },
  "WB": {
    classes: ["wooden_box_background_big32_horizontal"],
    scale: 2, // TODO: fix scaled placement if random. And random placed BG to be able to be placed on occupied spaces.
  },

  /* :: PROPS :: */
  // decorations
  "Bw": {
    classes: ["bottle_wine"],
    isProp: true,
    weight: 0.3,
  },
  "Gr": {
    classes() {
      const props = ["grass1", "grass2"];
      return [props[Math.floor(Math.random() * props.length)]];
    },
    offsetY: -4,
    isProp: true,
    weight: 0.8,
  },
};
