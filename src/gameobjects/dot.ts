import type {
  AnchorComp,
  AreaComp,
  CircleComp,
  ColorComp,
  GameObj,
  OpacityComp,
  PosComp,
  ScaleComp,
} from 'kaplay'

import { TAG } from '../constants'

const DOT_RADIUS = 18
const HALO_RADIUS = 36
const TAP_RADIUS = 44

export type DotColor = 'gold' | 'cyan' | 'rose' | 'violet'

const COLOR_MAP: Record<DotColor, [number, number, number]> = {
  gold: [245, 197, 66],
  cyan: [79, 195, 247],
  rose: [244, 143, 177],
  violet: [206, 147, 216],
}

interface DotState {
  dotColor: DotColor
  connected: boolean
}

export type Dot = GameObj<
  PosComp &
    AnchorComp &
    CircleComp &
    ColorComp &
    OpacityComp &
    ScaleComp &
    AreaComp &
    DotState &
    string
>

export function addDot(x: number, y: number, dotColor: DotColor): Dot {
  const [r, g, b] = COLOR_MAP[dotColor]

  const dot = add([
    pos(x, y),
    anchor('center'),
    circle(DOT_RADIUS),
    color(r, g, b),
    opacity(1),
    scale(1),
    area({
      shape: new Rect(
        vec2(-TAP_RADIUS, -TAP_RADIUS),
        TAP_RADIUS * 2,
        TAP_RADIUS * 2,
      ),
    }),
    TAG.DOT,
    { dotColor, connected: false } satisfies DotState,
  ]) as Dot

  dot.onDraw(() => {
    const base = dot.connected ? 1.5 : 1
    const rings = [
      { scale: 1.0, opacity: 0.04 },
      { scale: 0.85, opacity: 0.07 },
      { scale: 0.7, opacity: 0.1 },
      { scale: 0.55, opacity: 0.13 },
      { scale: 0.4, opacity: 0.17 },
      { scale: 0.25, opacity: 0.22 },
    ]
    for (const ring of rings) {
      drawCircle({
        pos: vec2(0, 0),
        radius: HALO_RADIUS * ring.scale,
        color: rgb(r, g, b),
        opacity: ring.opacity * base,
      })
    }
  })

  dot.onHover(() => {
    if (!dot.connected) {
      tween(
        dot.scale.x,
        1.15,
        0.12,
        (v) => {
          dot.scaleTo(v)
        },
        easings.easeOutQuad,
      )
    }
  })

  dot.onHoverEnd(() => {
    if (!dot.connected) {
      tween(
        dot.scale.x,
        1,
        0.12,
        (v) => {
          dot.scaleTo(v)
        },
        easings.easeOutQuad,
      )
    }
  })

  return dot
}

export function animateDotSelect(dot: Dot) {
  tween(
    1,
    1.3,
    0.1,
    (v) => {
      dot.scaleTo(v)
    },
    easings.easeOutQuad,
  ).then(() => {
    tween(
      1.3,
      1.1,
      0.12,
      (v) => {
        dot.scaleTo(v)
      },
      easings.easeOutQuad,
    )
  })
}

export function animateDotClear(dot: Dot, onDone: () => void) {
  tween(
    dot.scale.x,
    1.8,
    0.15,
    (v) => {
      dot.scaleTo(v)
    },
    easings.easeOutQuad,
  ).then(() => {
    tween(
      1,
      0,
      0.15,
      (v) => {
        dot.opacity = v
      },
      easings.easeInQuad,
    ).then(() => {
      onDone()
    })
  })
}
