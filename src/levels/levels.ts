import type { Level } from '../types'

export const LEVELS: Level[] = [
  {
    // Level 1 — Tutorial: 2 pairs (gold + cyan), simple X cross
    // gold: (1,1)→(4,4), cyan: (4,1)→(1,4) — guaranteed cross
    map: [
      '. . . . . .',
      '. g . . c .',
      '. . . . . .',
      '. . . . . .',
      '. c . . g .',
      '. . . . . .',
    ],
    tileWidth: 100,
    tileHeight: 100,
    hints: [
      'Tap a gold star',
      'Tap the other gold star',
      'Now connect the cyan stars',
      'Lines cross and clear!',
    ],
  },

  {
    // Level 2 — 3 pairs (gold + cyan + rose), draw order matters
    // gold: (1,1)→(5,3), rose: (0,2)→(4,4), cyan: (4,1)→(1,4)
    // solution: draw gold, rose (parallel, no cross), cyan last — crosses both
    map: [
      '. . . . . .',
      '. g . . c .',
      'r . . . . .',
      '. . . . . g',
      '. c . . r .',
      '. . . . . .',
    ],
    tileWidth: 100,
    tileHeight: 100,
  },

  {
    // Level 3 — Two independent X-crosses (4 pairs)
    // top cross: gold (1,0)→(4,2), cyan (4,0)→(1,2)
    // bottom cross: rose (1,3)→(4,5), violet (4,3)→(1,5)
    // solution: solve each X independently in either order
    map: [
      '. g . . c .',
      '. . . . . .',
      '. c . . g .',
      '. r . . v .',
      '. . . . . .',
      '. v . . r .',
    ],
    tileWidth: 100,
    tileHeight: 100,
  },

  {
    // Level 4 — 4 pairs, two interleaved order-constrained pairs
    // gold: (1,0)→(4,5), cyan: (4,0)→(1,5) — diagonals crossing rose and violet
    // rose: (0,2)→(5,2), violet: (0,3)→(5,3) — parallel horizontals, don't cross each other
    // solution: rose → gold (crosses rose) → violet → cyan (crosses violet)
    map: [
      '. g . . c .',
      '. . . . . .',
      'r . . . . r',
      'v . . . . v',
      '. . . . . .',
      '. c . . g .',
    ],
    tileWidth: 100,
    tileHeight: 100,
  },

  {
    // Level 5 — 5 pairs, two gold pairs + strict sequence with a combo
    // goldA: (1,0)→(4,5) ↘, goldB: (4,0)→(1,5) ↙ — same color, no cross
    // rose:   (0,2)→(5,2) horizontal — crosses both golds
    // violet: (0,3)→(5,3) horizontal — crosses both golds and cyan
    // cyan:   (2,0)→(3,5) nearly vertical — crosses rose and violet
    // solution: violet → cyan (crosses violet) → goldA → goldB → rose (combo: crosses both golds) ✅
    map: [
      '. g c . g .',
      '. . . . . .',
      'r . . . . r',
      'v . . . . v',
      '. . . . . .',
      '. g . c g .',
    ],
    tileWidth: 100,
    tileHeight: 100,
  },
]
