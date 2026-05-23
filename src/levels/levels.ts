import type { Level } from '../types'

export const LEVELS: Level[] = [
  {
    // Level 1 — Tutorial: 2 pairs (gold + cyan), simple X cross
    // gold: (2,2)→(9,9), cyan: (9,2)→(2,9) — guaranteed cross
    map: [
      '. . . . . . . . . . . .',
      '. . . . . . . . . . . .',
      '. . g . . . . . . c . .',
      '. . . . . . . . . . . .',
      '. . . . . . . . . . . .',
      '. . . . . . . . . . . .',
      '. . . . . . . . . . . .',
      '. . . . . . . . . . . .',
      '. . . . . . . . . . . .',
      '. . c . . . . . . g . .',
      '. . . . . . . . . . . .',
      '. . . . . . . . . . . .',
    ],
    tileWidth: 50,
    tileHeight: 50,
    hints: [
      'Tap a gold star',
      'Tap the other gold star',
      'Now connect the cyan stars',
      'Lines cross and clear!',
    ],
  },

  {
    // Level 2 — 2 gold pairs (X cross) + 1 cyan pair, draw order intro
    // goldA: (2,2)→(9,9) ↘, goldB: (9,2)→(2,9) ↙ — cross each other
    // cyan: (1,5)→(10,5) — horizontal, crosses both golds
    // solution: goldA → goldB (same-color cross) → cyan (crosses both golds)
    map: [
      '. . . . . . . . . . . .',
      '. . . . . . . . . . . .',
      '. . g . . . . . . g . .',
      '. . . . . . . . . . . .',
      '. . . . . . . . . . . .',
      '. c . . . . . . . . c .',
      '. . . . . . . . . . . .',
      '. . . . . . . . . . . .',
      '. . . . . . . . . . . .',
      '. . g . . . . . . g . .',
      '. . . . . . . . . . . .',
      '. . . . . . . . . . . .',
    ],
    tileWidth: 50,
    tileHeight: 50,
    hints: ['Can the same color clear lines?'],
  },

  {
    // Level 3 — 3 pairs (gold + cyan + rose), draw order matters
    // gold: (2,2)→(10,5), rose: (1,3)→(9,8), white: (1,6)→(7,10), cyan: (9,3)→(2,9)
    // solution: draw gold, rose, white (parallel, no cross), cyan last — crosses both
    map: [
      '. . . . . . . . . . . .',
      '. . . . . . . . . . . .',
      '. . g . . . . . . c . .',
      '. r . . . . . . . . . .',
      '. . . . . . . . . . . .',
      '. . . . . . . . . g . .',
      '. w . . . . . . . . . .',
      '. . . . . . . . . . . .',
      '. . c . . . . . . r . .',
      '. . . . . . . . . . . .',
      '. . . . . . . w . . . .',
      '. . . . . . . . . . . .',
    ],
    tileWidth: 50,
    tileHeight: 50,
    hints: ['Draw order matters'],
  },

  {
    // Level 4 — 4 pairs, two interleaved order-constrained pairs
    // gold: (2,1)→(9,10), cyan: (9,1)→(2,10) — diagonals crossing rose and green
    // rose: (1,4)→(10,4), green: (1,5)→(10,5) — parallel horizontals, don't cross each other
    // solution: rose → gold (crosses rose) → green → cyan (crosses green)
    map: [
      '. . . . . . . . . . . .',
      '. . g . . . . . . c . .',
      '. . . . . . . . . . . .',
      '. . . . . . . . . . . .',
      '. r . . . . . . . . r .',
      '. v . . . . . . . . v .',
      '. . . . . . . . . . . .',
      '. . . . . . . . . . . .',
      '. . . . . . . . . . . .',
      '. . c . . . . . . g . .',
      '. . . . . . . . . . . .',
      '. . . . . . . . . . . .',
    ],
    tileWidth: 50,
    tileHeight: 50,
    hints: ['Some lines need to be crossed before others'],
  },

  {
    // Level 5 — 6 pairs, two gold pairs + white combo, strict sequence
    // goldA: (2,1)→(9,10) ↘, goldB: (9,1)→(2,10) ↙ — same color, no cross
    // white: (1,3)→(10,3) — horizontal, crosses both golds
    // rose: (1,4)→(10,4) — horizontal, crosses both golds and white
    // green: (1,6)→(10,6) — horizontal, crosses golds and cyan
    // cyan: (4,1)→(7,10) — diagonal, crosses green and white
    // solution: cyan → green → goldA → goldB → white → rose (combo crosses all 3)
    map: [
      '. . . . . . . . . . . .',
      '. . g . . c . . . g . .',
      '. . . . . . . . . . . .',
      '. w . . . . . . . . w .',
      '. r . . . . . . . . r .',
      '. . . . . . . . . . . .',
      '. v . . . . . . . . v .',
      '. . . . . . . . . . . .',
      '. . . . . . . . . . . .',
      '. . g . . c . . . g . .',
      '. . . . . . . . . . . .',
      '. . . . . . . . . . . .',
    ],
    tileWidth: 50,
    tileHeight: 50,
    hints: ['A line can cross more than once'],
  },

  {
    // Level 6 — 4 pairs with same-color gold (parallel horizontals, can't cross)
    // goldA: (2,4)→(9,4), goldB: (2,9)→(9,9) — parallel horizontals, same color
    // rose: (5,1)→(5,11) — vertical at col 5, crosses both golds (used twice)
    // cyan: (2,6)→(5,3) — diagonal ↗ crosses goldA at (3.5,4)
    // green: (8,6)→(5,9) — diagonal ↙ crosses goldB at (6.5,9)
    // solution: cyan → goldA → rose (clears) → green → goldB → rose (clears)
    map: [
      '. . . . . r . . . . . .',
      '. . . . . . . . . . . .',
      '. . . . . c . . . . . .',
      '. g . . . . . . . g . .',
      '. . . . . . . . . . . .',
      '. c . . . . . . v . . .',
      '. . . . . . . . . . . .',
      '. . . . . . . . . . . .',
      '. . . . . . . . . . . .',
      '. g . . v . . . . g . .',
      '. . . . . r . . . . . .',
      '. . . . . . . . . . . .',
    ],
    tileWidth: 50,
    tileHeight: 50,
    hints: ['The same line can clear more than one pair'],
  },
]
