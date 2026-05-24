import type { AudioPlay } from 'kaplay'

import { SOUND } from './constants'

const STORAGE_KEY = 'org.remarkablegames.cross-link.muted'

let musicHandle: AudioPlay | null = null

export function startMusic() {
  if (musicHandle) return
  const muted = getData<boolean>(STORAGE_KEY) ?? false
  musicHandle = play(SOUND.MUSIC, {
    loop: true,
    paused: muted,
  })
}

export function toggleMute() {
  const muted = isMuted()
  const next = !muted
  setData(STORAGE_KEY, next)
  if (musicHandle) {
    musicHandle.paused = next
  }
}

export function isMuted(): boolean {
  return getData<boolean>(STORAGE_KEY) ?? false
}
