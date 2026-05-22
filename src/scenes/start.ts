import './game'
import './level-complete'
import './preload'

import { SCENE } from '../constants'

export function start() {
  go(SCENE.PRELOAD)
}
