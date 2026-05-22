import { SCENE, TAG } from '../constants'
import {
  addDot,
  animateDotSelect,
  type Dot,
  type DotColor,
} from '../gameobjects/dot'
import {
  addLine,
  clearLines,
  findIntersectingLines,
  type Line,
} from '../gameobjects/line'
import { LEVELS } from '../levels'

const BG_COLOR = [10, 10, 26] as const
const HEADER_BG_COLOR = [13, 13, 43] as const
const HEADER_H = 100
const FOOTER_H = 100
const GRID_OFFSET_Y = HEADER_H

const SYMBOL_COLOR: Partial<Record<string, DotColor>> = {
  g: 'gold',
  c: 'cyan',
  r: 'rose',
  v: 'violet',
}

const COLOR_MAP: Record<DotColor, [number, number, number]> = {
  gold: [245, 197, 66],
  cyan: [79, 195, 247],
  rose: [244, 143, 177],
  violet: [206, 147, 216],
}

function drawBgStars(count: number) {
  for (let i = 0; i < count; i++) {
    const sx = rand(0, width())
    const sy = rand(0, height())
    const sr = rand(0.5, 2)
    add([
      pos(sx, sy),
      anchor('center'),
      circle(sr),
      color(220, 220, 255),
      opacity(rand(0.2, 0.6)),
    ])
  }
}

scene(SCENE.GAME, (rawIndex = 0) => {
  const levelIndex = Number(rawIndex)
  const level = LEVELS.at(levelIndex)
  if (!level) return

  setBackground(BG_COLOR[0], BG_COLOR[1], BG_COLOR[2])
  drawBgStars(60)

  const dots: Dot[] = []
  const lines: Line[] = []
  let selectedDot: Dot | null = null
  let moveCount = 0
  let hintStep = 0
  let clearing = false

  add([
    rect(width(), HEADER_H),
    pos(0, 0),
    color(HEADER_BG_COLOR[0], HEADER_BG_COLOR[1], HEADER_BG_COLOR[2]),
    z(10),
  ])

  add([
    rect(width(), FOOTER_H),
    pos(0, height() - FOOTER_H),
    color(HEADER_BG_COLOR[0], HEADER_BG_COLOR[1], HEADER_BG_COLOR[2]),
    z(10),
  ])

  add([
    rect(width(), 1),
    pos(0, HEADER_H),
    color(255, 255, 255),
    opacity(0.08),
    z(11),
  ])
  add([
    rect(width(), 1),
    pos(0, height() - FOOTER_H),
    color(255, 255, 255),
    opacity(0.08),
    z(11),
  ])

  add([
    text(`Level ${String(levelIndex + 1)}`, { size: 26 }),
    pos(20, 30),
    anchor('left'),
    color(220, 220, 255),
    z(12),
  ])

  const moveText = add([
    text('Moves: 0', { size: 22 }),
    pos(width() - 20, 30),
    anchor('right'),
    color(180, 180, 220),
    scale(1),
    z(12),
  ])

  const hintText = add([
    text('', { size: 18, width: width() - 40 }),
    pos(width() / 2, 72),
    anchor('center'),
    color(160, 180, 255),
    opacity(0),
    z(12),
  ])

  function showHint(msg: string) {
    hintText.text = msg
    tween(
      0,
      1,
      0.3,
      (v) => {
        hintText.opacity = v
      },
      easings.easeOutQuad,
    )
  }

  if (level.hints && level.hints.length > 0) {
    showHint(level.hints[0])
    hintStep = 0
  }

  function advanceHint(step: number) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!level!.hints) return
    hintStep = step
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (step < level!.hints.length) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      showHint(level!.hints[step])
    } else {
      tween(
        hintText.opacity,
        0,
        0.3,
        (v) => {
          hintText.opacity = v
        },
        easings.easeOutQuad,
      )
    }
  }

  const restartBtn = add([
    text('↺ Restart', { size: 22 }),
    pos(width() / 2, height() - FOOTER_H / 2),
    anchor('center'),
    color(180, 180, 220),
    area(),
    z(12),
  ])

  restartBtn.onHover(() => {
    restartBtn.color = rgb(255, 255, 255)
  })
  restartBtn.onHoverEnd(() => {
    restartBtn.color = rgb(180, 180, 220)
  })
  restartBtn.onClick(() => {
    go(SCENE.GAME, levelIndex)
  })

  const { map, tileWidth, tileHeight } = level
  for (let row = 0; row < map.length; row++) {
    const symbols = map[row].split(' ')
    for (let col = 0; col < symbols.length; col++) {
      const sym = symbols[col]
      if (sym === '.') continue
      const dotColor = SYMBOL_COLOR[sym]
      if (!dotColor) continue
      const x = col * tileWidth + tileWidth / 2
      const y = row * tileHeight + tileHeight / 2 + GRID_OFFSET_Y
      const dot = addDot(x, y, dotColor)
      dots.push(dot)
    }
  }

  function updateMoveText() {
    moveText.text = `Moves: ${String(moveCount)}`
    tween(
      1,
      1.25,
      0.08,
      (v) => {
        moveText.scaleTo(v)
      },
      easings.easeOutQuad,
    ).then(() => {
      tween(
        1.25,
        1,
        0.1,
        (v) => {
          moveText.scaleTo(v)
        },
        easings.easeOutQuad,
      )
    })
  }

  function checkWin() {
    const remaining = get(TAG.DOT)
    if (remaining.length === 0) {
      wait(0.4, () => {
        go(SCENE.LEVEL_COMPLETE, levelIndex)
      })
    }
  }

  onMousePress(() => {
    if (clearing) return
    const mp = mousePos()

    for (const dot of dots) {
      if (!dot.exists()) continue
      const d = mp.dist(dot.pos)
      if (d > 44) continue

      if (dot.connected) continue

      if (!selectedDot) {
        selectedDot = dot
        dot.connected = true
        animateDotSelect(dot)
        advanceHint(hintStep + 1)
        return
      }

      if (selectedDot === dot) {
        selectedDot.connected = false
        selectedDot = null
        return
      }

      if (selectedDot.dotColor !== dot.dotColor) {
        return
      }

      dot.connected = true
      const newLine = addLine(selectedDot, dot, dot.dotColor)
      lines.push(newLine)
      moveCount++
      updateMoveText()
      advanceHint(hintStep + 1)

      const hits = findIntersectingLines(newLine, lines)
      if (hits.length > 0) {
        clearing = true
        const toClear = [newLine, ...hits]
        for (const l of toClear) {
          const idx = lines.indexOf(l)
          if (idx !== -1) lines.splice(idx, 1)
          dots.splice(dots.indexOf(l.dotA), 1)
          dots.splice(dots.indexOf(l.dotB), 1)
        }
        advanceHint(hintStep + 1)
        clearLines(toClear, () => {
          clearing = false
          checkWin()
        })
      }

      selectedDot = null
      return
    }

    if (selectedDot) {
      selectedDot.connected = false
      selectedDot = null
    }
  })

  onDraw(() => {
    if (selectedDot?.exists()) {
      const [r, g, b] = COLOR_MAP[selectedDot.dotColor]
      drawLine({
        p1: selectedDot.pos,
        p2: mousePos(),
        width: 2,
        color: rgb(r, g, b),
        opacity: 0.4,
      })
    }
  })
})
