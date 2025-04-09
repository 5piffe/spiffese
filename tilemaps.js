/* ==::TILES::==
 * =============
 * '  ' = Empty space
 * 'SS' = Squirrel start position
 *
 * 'Bt' = Brick top lft corner
 * 'BT' = Brick top lft edge
 * 'Bm' = Brick top mid (random)
 * 'Br' = Brick top rgt corner
 * 'BR' = Brick top rgt edge
 *
 * 'Wh' = Wooden box hor
 * 'Wv' = Wooden box vrt
 *
 * 
 */

const tileMap = [
  ['Wv'],
  ['  '],
  ['  '],
  ['  ', '  ', 'Wv'],
  ['  ', '  ', 'Wv', 'Wh'],
  ['  ', 'Bt', 'Bm', 'Bm', 'Br'],
];
