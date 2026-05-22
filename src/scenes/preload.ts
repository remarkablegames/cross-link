import { SCENE } from '../constants'
import { LEVELS } from '../levels'

scene(SCENE.PRELOAD, () => {
  const params = new URLSearchParams(window.location.search)
  const raw = parseInt(params.get('level') ?? '1', 10)
  const levelIndex = Math.min(Math.max(raw - 1, 0), LEVELS.length - 1)
  go(SCENE.GAME, levelIndex)
})
