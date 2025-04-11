/* ==::TILES::==
 * =============
 * '  ' = Empty space
 * 'SS' = Squirrel start position //TODO: add this functinoality
 *
 * == WALKABLE ==
 * 'Bt' = Brick top lft corner
 * 'BT' = Brick top lft edge
 * 'Bm' = Brick top mid (random)
 * 'Br' = Brick top rgt corner
 * 'BR' = Brick top rgt edge
 *
 * 'Wh' = Wooden box hor
 * 'Wv' = Wooden box vrt
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

const tileMap_props_foreground = [
  ['Gr'],
  ['  '],
  ['  '],
  ['  ', '  ', '  ', 'Gr'],
  ['  ', 'Gr'],
  ['  '],
];

const tileMap_props_background = [
  ['Bw'],
  ['  '],
  ['  '],
  ['  '],
  ['  '],
  ['  '],
];
