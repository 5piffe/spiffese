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
 * 'Wp' = Wooden plank
 *
 * - decorations -
 * 'Wb' = Wooden box background
 * 'WB' = Wooden box background big32
 *
 * == PROPS ==
 * - decorations - 
 * 'Gr' = Small grass tuva (random)
 * 'Bw' = Bottle wine
 */

const tileMap_walkable = [
  ['Wp'],
  ['Ws'],
  ['  ', '  ', 'Wh'],
  ['  '],
  ['Wv'],
  ['Wp'],
  ['Ws', '  ', 'Wh'],
  ['  ', '  ', 'Wv', 'Wh'],
  ['Wp', 'Bt', 'Bm', 'Bm', 'Br'],
];
