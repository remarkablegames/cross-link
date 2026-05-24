import { SOUND, UI } from '../constants'

export function addButton(
  label: string,
  position: ReturnType<typeof vec2>,
  onClick: () => void,
) {
  const button = add([
    text(label, { size: UI.TEXT_SIZE }),
    pos(position),
    anchor('center'),
    color(...UI.TEXT_COLOR),
    opacity(1),
    scale(1),
    area(),
  ])

  button.onHover(() => {
    play(SOUND.BUTTON_HOVER, { volume: 0.5 })
    button.color = rgb(255, 255, 255)
    tween(
      button.scale.x,
      1.1,
      0.1,
      (v) => {
        button.scaleTo(v)
      },
      easings.easeOutQuad,
    )
    setCursor('pointer')
  })

  button.onHoverEnd(() => {
    button.color = rgb(...UI.TEXT_COLOR)
    tween(
      button.scale.x,
      1,
      0.1,
      (v) => {
        button.scaleTo(v)
      },
      easings.easeOutQuad,
    )
    setCursor('default')
  })

  button.onClick(() => {
    play(SOUND.CLICK)
    onClick()
  })

  return button
}
