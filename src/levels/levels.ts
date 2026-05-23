import type { Level } from '../types'

export const LEVELS: Level[] = [
  {
    // Level 1 — Tutorial: 2 pairs (gold + cyan), simple X cross
    // gold: (2,2)→(7,7), cyan: (7,2)→(2,7) — guaranteed cross
    map: [
      '. . . . . . . . . .',
      '. . . . . . . . . .',
      '. . g . . . . c . .',
      '. . . . . . . . . .',
      '. . . . . . . . . .',
      '. . . . . . . . . .',
      '. . . . . . . . . .',
      '. . c . . . . g . .',
      '. . . . . . . . . .',
      '. . . . . . . . . .',
    ],
    tileWidth: 60,
    tileHeight: 60,
    hints: [
      'Tap a gold star',
      'Tap the other gold star',
      'Now connect the cyan stars',
      'Lines cross and clear!',
    ],
  },

  {
    // Level 2 — 3 pairs (gold + cyan + rose), draw order matters
    // gold: (2,2)→(8,5), rose: (1,3)→(7,7), cyan: (7,3)→(2,8)
    // solution: draw gold, rose (parallel, no cross), cyan last — crosses both
    map: [
      '. . . . . . . . . .',
      '. . . . . . . . . .',
      '. . g . . . . c . .',
      '. r . . . . . . . .',
      '. . . . . . . . . .',
      '. . . . . . . g . .',
      '. . . . . . . . . .',
      '. . c . . . . r . .',
      '. . . . . . . . . .',
      '. . . . . . . . . .',
    ],
    tileWidth: 60,
    tileHeight: 60,
  },

  {
    // Level 3 — Two independent X-crosses (4 pairs)
    // top cross: gold (2,1)→(7,3), cyan (7,1)→(2,3)
    // bottom cross: rose (2,5)→(7,7), green (7,5)→(2,7)
    // solution: solve each X independently in either order
    map: [
      '. . . . . . . . . .',
      '. . g . . . . c . .',
      '. . . . . . . . . .',
      '. . c . . . . g . .',
      '. . . . . . . . . .',
      '. . r . . . . v . .',
      '. . . . . . . . . .',
      '. . v . . . . r . .',
      '. . . . . . . . . .',
      '. . . . . . . . . .',
    ],
    tileWidth: 60,
    tileHeight: 60,
  },

  {
    // Level 4 — 4 pairs, two interleaved order-constrained pairs
    // gold: (2,1)→(7,8), cyan: (7,1)→(2,8) — diagonals crossing rose and green
    // rose: (1,4)→(8,4), green: (1,5)→(8,5) — parallel horizontals, don't cross each other
    // solution: rose → gold (crosses rose) → green → cyan (crosses green)
    map: [
      '. . . . . . . . . .',
      '. . g . . . . c . .',
      '. . . . . . . . . .',
      '. . . . . . . . . .',
      '. r . . . . . . r .',
      '. v . . . . . . v .',
      '. . . . . . . . . .',
      '. . . . . . . . . .',
      '. . c . . . . g . .',
      '. . . . . . . . . .',
    ],
    tileWidth: 60,
    tileHeight: 60,
  },

  {
    // Level 5 — 5 pairs, two gold pairs + strict sequence with a combo
    // goldA: (2,1)→(7,8) ↘, goldB: (7,1)→(2,8) ↙ — same color, no cross
    // rose:   (1,4)→(8,4) horizontal — crosses both golds
    // green: (1,5)→(8,5) horizontal — crosses both golds and cyan
    // cyan:   (3,1)→(4,8) nearly vertical — crosses rose and green
    // solution: green → cyan (crosses green) → goldA → goldB → rose (combo: crosses both golds) ✅
    map: [
      '. . . . . . . . . .',
      '. . g c . . . g . .',
      '. . . . . . . . . .',
      '. . . . . . . . . .',
      '. r . . . . . . r .',
      '. v . . . . . . v .',
      '. . . . . . . . . .',
      '. . . . . . . . . .',
      '. . g . c . . g . .',
      '. . . . . . . . . .',
    ],
    tileWidth: 60,
    tileHeight: 60,
  },
]
