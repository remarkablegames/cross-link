import { UI } from '../constants'

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
    area(),
  ])

  button.onHover(() => {
    button.color = rgb(255, 255, 255)
    setCursor('pointer')
  })

  button.onHoverEnd(() => {
    button.color = rgb(...UI.TEXT_COLOR)
    setCursor('default')
  })

  button.onClick(onClick)

  return button
}
