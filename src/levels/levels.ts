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
    // Level 3 — Combo: 3 pairs, one line crosses two others at once
    // violet: (0,2)→(5,2) horizontal, gold: (1,0)→(1,4), cyan: (4,0)→(4,4)
    // violet line crosses both gold and cyan
    map: [
      '. g . . c .',
      '. . . . . .',
      'v . . . . v',
      '. . . . . .',
      '. g . . c .',
      '. . . . . .',
    ],
    tileWidth: 100,
    tileHeight: 100,
  },

  {
    // Level 4 — 4 pairs, tighter layout
    // gold: (1,1)→(4,4), cyan: (4,1)→(1,4)
    // rose: (0,2)→(5,3), violet: (2,0)→(3,5)
    map: [
      '. . v . . .',
      '. g . . c .',
      'r . . . . .',
      '. . . . . r',
      '. c . . g .',
      '. . . v . .',
    ],
    tileWidth: 100,
    tileHeight: 100,
  },

  {
    // Level 5 — 4 pairs, chain clearing (hardest)
    // gold: (0,0)→(5,5), cyan: (5,0)→(0,5)
    // rose: (1,2)→(4,3), violet: (2,1)→(3,4)
    map: [
      'g . . . . c',
      '. . v . . .',
      '. r . . . .',
      '. . . . r .',
      '. . . v . .',
      'c . . . . g',
    ],
    tileWidth: 100,
    tileHeight: 100,
  },
]
