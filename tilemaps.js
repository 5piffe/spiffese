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
 * - decorations -
 *
 * == WOODEN STUFF ==
 * - walkable -
 * 'Wh' = Wooden box hor
 * 'Wv' = Wooden box vrt
 * 'WV' = Wooden box big32
 * 'Wp' = Wooden plank
 *
 * - decorations -
 * 'Ws' = Wooden support left
 * 'Wb' = Wooden box background
 * 'WB' = Wooden box background big32
 *
 * == PROPS ==
 * - decorations - 
 * 'Bw' = Bottle wine
 * 'Gr' = Small grass tuva (random)
 *
 */

const tileMap_walkable = [
  ['  ', '  ', 'Wh'],
  ['  '],
  ['Wv'],
  ['Wp'],
  ['Ws', '  ', 'Wh'],
  ['  ', '  ', 'Wv', 'Wh'],
  ['Wp', 'Bt', 'Bm', 'Bm', 'Br'],
];
