import { SCENE } from '../constants'
import { LEVELS } from '../levels'

const BG_COLOR = [10, 10, 26] as const
const HEADER_BG_COLOR = [13, 13, 43] as const

scene(SCENE.LEVEL_COMPLETE, (rawIndex = 0) => {
  const levelIndex = Number(rawIndex)
  setBackground(BG_COLOR[0], BG_COLOR[1], BG_COLOR[2])

  add([
    rect(width(), height()),
    color(HEADER_BG_COLOR[0], HEADER_BG_COLOR[1], HEADER_BG_COLOR[2]),
    opacity(0.6),
  ])

  const titleText = add([
    text('✦ Level Complete ✦', { size: 36 }),
    pos(width() / 2, height() / 2 - 80),
    anchor('center'),
    color(245, 197, 66),
    opacity(0),
    scale(0.5),
  ])

  tween(
    titleText.pos.y + 40,
    titleText.pos.y,
    0.45,
    (v) => {
      titleText.pos.y = v
    },
    easings.easeOutBack,
  )
  tween(
    0,
    1,
    0.4,
    (v) => {
      titleText.opacity = v
    },
    easings.easeOutQuad,
  )
  tween(
    0.5,
    1,
    0.4,
    (v) => {
      titleText.scaleTo(v)
    },
    easings.easeOutBack,
  )

  const nextLevelIndex = levelIndex + 1
  const hasNextLevel = nextLevelIndex < LEVELS.length

  const btnLabel = hasNextLevel ? 'Next Level →' : 'Play Again'

  const btn = add([
    text(btnLabel, { size: 28 }),
    pos(width() / 2, height() / 2 + 20),
    anchor('center'),
    color(200, 200, 255),
    area(),
    opacity(0),
  ])

  wait(0.5, () => {
    tween(
      0,
      1,
      0.3,
      (v) => {
        btn.opacity = v
      },
      easings.easeOutQuad,
    )
  })

  btn.onHover(() => {
    btn.color = rgb(255, 255, 255)
    setCursor('pointer')
  })
  btn.onHoverEnd(() => {
    btn.color = rgb(200, 200, 255)
    setCursor('default')
  })
  btn.onClick(() => {
    go(SCENE.GAME, hasNextLevel ? nextLevelIndex : 0)
  })
})
