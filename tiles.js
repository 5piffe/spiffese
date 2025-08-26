/* optional params:
 * isProp     - randomly place tile above any random walkabe tile.
 * weight     - weight for prop placement probability (0-1, 50% if not defined).
 * scale      - if using for example 32x32 instead of 16x16 scale: 2 will keep correct dpi.
 * offsetY    - yes... 
 * tileWidth,
 * tileHeight - for non-square tiles, specify tilesize in pixels for correct collision if needed.
 * isForeGround - z-index in front of squirrel */

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

  "Wp": {
    classes: ["wooden_plank", "passable_platform"],
    tileWidth: 16,
    tileHeight: 2,
    offsetY: 14,
    isForeGround: true,
  },

  // decorations
  "Ws": {
    classes: ["wooden_support_left"],
    offsetY: 14,
    isForeGround: true,
  },

  "Wb": {
    classes: ["wooden_box_background_horizontal"],
    isProp: true,
    weight: 0.35
  },
  "WB": {
    classes: ["wooden_box_background_big32_horizontal"],
    scale: 2,
  },

  /* :: PROPS :: */
  // decorations
  "Bw": {
    classes: ["bottle_wine"],
    isProp: true,
    isForeGround: true,
    weight: 0.3,
  },
  "Gr": {
    classes(season) {
      if (season === "halloween") {
        const props = ["pumpkin1", "spider_web"];
        return [props[Math.floor(Math.random() * props.length)]];
      }
      const props = ["grass1", "grass2"];
      return [props[Math.floor(Math.random() * props.length)]];
    },
    offsetY: -4,
    isProp: true,
    isForeGround: true,
    weight: 0.8,
  },
  "Ii": {
    classes() {
      const props = ["insect1", "insect2"];
      return [props[Math.floor(Math.random() * props.length)]];
    },
    isProp: true,
    isForeGround: true,
    weight: 0.99,
  },
};
