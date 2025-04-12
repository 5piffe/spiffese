/* ==::TILES::==
 * =============
 * '  ' = Empty space
 *
 * == BRICKLAND ==
 * - walkable -
 * 'Bt' = Brick top lft corner
 * 'BT' = Brick top lft edge
 * 'Bm' = Brick top mid (random)
 * 'Br' = Brick top rgt corner
 * 'BR' = Brick top rgt edge
 *
 *
 * == WOODEN STUFF ==
 * - walkable -
 * 'Wh' = Wooden box hor
 * 'Wv' = Wooden box vrt
 *
 * - decorations -
 * 'Wb' = Wooden box background
 * 'WB' = Wooden box background big32
 *
 *
 * == PROPS ==
 * 'Gr' = Small grass tuva (random)
 * 'Bw' = Bottle wine
 */

const tileMap_walkable = [
  ['  ', '  ', 'Wh'],
  ['  '],
  ['Wv'],
  ['  '],
  ['  ', '  ', 'Wh'],
  ['  ', '  ', 'Wv', 'Wh'],
  ['  ', 'Bt', 'Bm', 'Bm', 'Br'],
];

// const tileMap_props_foreground = [
//   ['Gr'],
//   ['  '],
//   ['  '],
//   ['  ', '  ', '  ', 'Gr'],
//   ['  ', 'Gr'],
//   ['  ']
// ];
//
// const tileMap_props_background = [
//   ['WB'],
// ];
